import { useEffect, useState } from 'react'

import { chakra, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import { StrapiModel, StrapiModelKeys } from '@wsvvrijheid/types'
import { camelCase, startCase } from 'lodash'
import { FaArrowDown, FaArrowUp, FaSort } from 'react-icons/fa'

import { WTableRow } from './TableRow'
import { CellConfig, WTableProps } from './types'

export const WTable = <T extends StrapiModel>({
  data,
  columns: config,
  onClickRow,
  onSort,
  ...rest
}: WTableProps<T>) => {
  const [sortMode, setSortMode] = useState<'desc' | 'asc' | null>(null)
  const [selectedColumn, setSelectedColumn] = useState<StrapiModelKeys | null>(
    null,
  )

  const toggleSort = (columnKey: StrapiModelKeys) => {
    setSelectedColumn(columnKey)

    if (sortMode === 'asc') {
      setSortMode('desc')
    } else if (sortMode === 'desc') {
      setSortMode(null)
    } else {
      setSortMode('asc')
    }
  }

  useEffect(() => {
    if (sortMode && selectedColumn) {
      onSort?.([`${selectedColumn}:${sortMode}`])
    } else if (!sortMode && selectedColumn) {
      onSort?.(null)
    }
  }, [sortMode, selectedColumn])

  return (
    <Table cursor="default" {...rest}>
      <Thead>
        <Tr>
          {Object.keys(config).map((key, index) => {
            const isSortable = (config[key as keyof T] as CellConfig<T>)
              .sortable

            const getSortIcon = () => {
              if (!isSortable) return

              if (selectedColumn === key) {
                if (sortMode === 'asc') {
                  return FaArrowUp
                } else if (sortMode === 'desc') {
                  return FaArrowDown
                }
              }

              return FaSort
            }

            return (
              <Th
                pos="relative"
                key={index}
                {...(isSortable && {
                  cursor: 'pointer',
                  onClick: () => toggleSort(key as StrapiModelKeys),
                })}
              >
                {startCase(camelCase(key))}
                <chakra.span ml={2} display="inline" as={getSortIcon()} />
              </Th>
            )
          })}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((model, index) => {
          return (
            <WTableRow
              key={index}
              artIndex={index}
              model={model}
              columns={config}
              onClick={onClickRow}
            />
          )
        })}
      </Tbody>
    </Table>
  )
}
