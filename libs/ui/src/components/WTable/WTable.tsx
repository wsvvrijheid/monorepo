import { useEffect, useState } from 'react'

import { chakra, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import { StrapiModel, StrapiModelKeys } from '@wsvvrijheid/types'
import { camelCase, startCase } from 'lodash'
import { FaArrowDown, FaArrowUp, FaSort } from 'react-icons/fa'

import { WTableRow } from './TableRow'
import { CellConfig, WTableProps } from './types'

export const WTable = <T extends StrapiModel>({
  data,
  columns,
  onClickRow,
  onSort,
  ...rest
}: WTableProps<T>) => {
  const [sortMode, setSortMode] = useState<'desc' | 'asc' | null>(null)
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null)

  const toggleSort = (columnKey: string) => {
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
    const { transform, sortKey } = columns?.[selectedColumn as keyof T] || {}

    if (sortMode && selectedColumn) {
      if (transform && sortKey) {
        onSort?.([`${selectedColumn}.${sortKey}:${sortMode}`])
      } else {
        onSort?.([`${selectedColumn}:${sortMode}`])
      }
    } else if (!sortMode && selectedColumn) {
      onSort?.(null)
    }
  }, [sortMode, selectedColumn])

  return (
    <Table size="sm" cursor="default" {...rest}>
      <Thead>
        <Tr>
          {Object.keys(columns).map((key, index) => {
            const isSortable = (columns[key as keyof T] as CellConfig<T>)
              .sortable

            const label = (columns[key as keyof T] as CellConfig<T>).label

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
                whiteSpace="nowrap"
                {...(isSortable && {
                  cursor: 'pointer',
                  onClick: () => toggleSort(key as StrapiModelKeys),
                })}
              >
                {label || startCase(camelCase(key))}

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
              model={model}
              modelIndex={index}
              columns={columns}
              onClick={onClickRow}
            />
          )
        })}
      </Tbody>
    </Table>
  )
}
