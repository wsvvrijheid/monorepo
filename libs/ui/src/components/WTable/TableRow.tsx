import { Tr } from '@chakra-ui/react'
import { StrapiModel } from '@wsvvrijheid/types'

import { CellConfig, WTableRowProps } from './types'
import { WTableCell } from './WTableCell'

export const WTableRow = <T extends StrapiModel>({
  model: data,
  config,
}: WTableRowProps<T>) => {
  return (
    <Tr>
      {Object.keys(config).map((key, index) => {
        const field = key as keyof T
        const value = data[field]
        const cell = config[field] as CellConfig<T>

        return <WTableCell key={index} value={value} cell={cell} />
      })}
    </Tr>
  )
}
