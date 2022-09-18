import { Tr } from '@chakra-ui/react'
import { StrapiModel } from '@wsvvrijheid/types'

import { CellConfig, WTableRowProps } from './types'
import { WTableCell } from './WTableCell'

export const WTableRow = <T extends StrapiModel>({
  model: data,
  columns,
}: WTableRowProps<T>) => {
  return (
    <Tr>
      {Object.keys(columns).map((key, index) => {
        const field = key as keyof T
        const value = data[field]
        const cell = columns[field] as CellConfig<T>

        return <WTableCell key={index} value={value} cellConfig={cell} />
      })}
    </Tr>
  )
}
