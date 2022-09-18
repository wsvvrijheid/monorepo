import { Avatar, Badge, Td } from '@chakra-ui/react'
import { API_URL } from '@wsvvrijheid/config'
import { StrapiModel, UploadFile } from '@wsvvrijheid/types'

import { FormattedDate } from '../FormattedDate'
import { WTableCellProps } from './types'

export const WTableCell = <T extends StrapiModel>({
  value,
  cell,
}: WTableCellProps<T>) => {
  const data = (
    typeof cell.transform === 'function'
      ? cell.transform(value as T[keyof T])
      : value
  ) as string | number | boolean

  const props =
    typeof cell.props === 'function'
      ? cell.props(data as T[keyof T])
      : cell.props || {}

  // Badge
  if (cell.type === 'badge') {
    return (
      <Td>
        <Badge {...props}>{data}</Badge>
      </Td>
    )
  }

  // Date
  if (cell.type === 'date') {
    return (
      <Td>
        <FormattedDate {...props} date={data as string} />
      </Td>
    )
  }

  // Image
  if (cell.type === 'images' || cell.type === 'image') {
    const image = (value as UploadFile[])?.[0] || (value as UploadFile)
    const thumbnail = image?.formats?.thumbnail?.url || image?.url

    return (
      <Td>
        <Avatar size="md" src={`${API_URL}${thumbnail}`} />
      </Td>
    )
  }

  return <Td>{data}</Td>
}
