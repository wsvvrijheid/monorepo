import { ReactNode } from 'react'

import { Avatar, Badge, Td, Tooltip, Box } from '@chakra-ui/react'
import { API_URL } from '@wsvvrijheid/config'
import { StrapiModel, UploadFile } from '@wsvvrijheid/types'

import { WTableCellProps } from './types'
import { FormattedDate } from '../FormattedDate'
import { WImage } from '../WImage'

export const WTableCell = <T extends StrapiModel>({
  value,
  cellConfig,
  field,
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
  else if (type === 'image') {
    const image = (value as UploadFile[])?.[0] || (value as UploadFile)
    const thumbnail = image?.formats?.thumbnail?.url || image?.url

    cellContent = (
      <Tooltip
        p={0}
        overflow="hidden"
        placement="right-end"
        bg="white"
        rounded="md"
        size="lg"
        label={<WImage h={150} w={300} src={image} />}
      >
        <Avatar size="md" src={`${API_URL}${thumbnail}`} />
      </Tooltip>
    )
  } else {
    cellContent = data
  }

  return (
    <Td {...cellProps}>
      <Box
        {...(field === 'description' && { noOfLines: 1, maxW: 120 })}
        noOfLines={1}
      >
        {cellContent}
      </Box>
    </Td>
  )
}
