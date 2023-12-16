import { FC } from 'react'

import { Stack, StackProps, Text } from '@chakra-ui/react'

type FoundationDetailItemProps = StackProps & {
  label: string | null
  value?: string | null
  alignedLeft?: boolean
}

export const FoundationDetailItem: FC<FoundationDetailItemProps> = ({
  label,
  value,
  alignedLeft,
  ...rest
}) => {
  return (
    <Stack direction={'row'} {...rest}>
      <Text
        fontWeight={'bold'}
        color={'primary.500'}
        {...(alignedLeft && { float: 'left', mr: 2 })}
      >
        {label}
      </Text>
      <Text>{value}</Text>
    </Stack>
  )
}
