import { ReactNode } from 'react'

import { Avatar, Badge, Td, Tooltip, Image } from '@chakra-ui/react'
import { API_URL } from '@wsvvrijheid/config'
import { StrapiModel, UploadFile } from '@wsvvrijheid/types'

import { FormattedDate } from '../FormattedDate'
import { WTableCellProps } from './types'

export const WTableCell = <T extends StrapiModel>({
  value,
  cellConfig,
}: WTableCellProps<T>) => {
  const { type, transform, componentProps, cellProps } = cellConfig
  const data = (
    typeof transform === 'function' ? transform(value as T[keyof T]) : value
  ) as string | number | boolean

  let cellContent: ReactNode

  const props =
    typeof componentProps === 'function'
      ? componentProps(data as T[keyof T])
      : componentProps || {}

  // Badge
  if (type === 'badge') {
    cellContent = <Badge {...props}>{data}</Badge>
  }

  // Date
  else if (type === 'date') {
    cellContent = <FormattedDate {...props} date={data as string} />
  }

  // Image
  else if (type === 'images' || type === 'image') {
    const image = (value as UploadFile[])?.[0] || (value as UploadFile)
    const thumbnail = image?.formats?.thumbnail?.url || image?.url

    cellContent = (
      <Tooltip
        bg="transparent"
        borderRadius={'5%'}
        label={<Image src={`${API_URL}${thumbnail}`} />}
      >
        <Avatar size="md" src={`${API_URL}${thumbnail}`} />
      </Tooltip>
    )
  } else {
    cellContent = data
  }

  return <Td {...cellProps}>{cellContent}</Td>
}
