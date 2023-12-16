import { FC } from 'react'

import { Stack, StackProps, Text } from '@chakra-ui/react'

type DetailCardProps = StackProps & {
  label: string | null
  value?: string | null
}

export const DetailCard: FC<DetailCardProps> = ({ label, value, ...rest }) => {
  return (
    <Stack direction={'row'} {...rest}>
      <Text fontWeight={'bold'} color={'primary.500'}>
        {label}
      </Text>
      <Text>{value}</Text>
    </Stack>
  )
}
