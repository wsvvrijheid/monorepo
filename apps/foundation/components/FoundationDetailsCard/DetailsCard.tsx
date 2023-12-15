import { FC } from 'react'

import { HStack, Text } from '@chakra-ui/react'

interface DetailsCard {
  label: string | null
  value?: string | null
}

export const DetailsCard: FC<DetailsCard> = ({ label, value }) => {
  return (
    <HStack
      direction={{ base: 'column', lg: 'row' }}
      align={{ base: 'center', lg: 'start' }}
      p={2}
      spacing={4}
      bg="white"
      rounded="lg"
    >
      <Text fontWeight={'bold'} color={'primary.500'}>
        {label}
      </Text>
      <Text fontSize="sm">{value}</Text>
    </HStack>
  )
}
