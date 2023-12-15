import { FC } from 'react'

import { Stack, Heading, Text, HStack } from '@chakra-ui/react'

import { WAvatar } from '@wsvvrijheid/ui'
interface DirectorsCardProps {
  label: string
  value: string
}

export const DirectorsCard: FC<DirectorsCardProps> = ({ label, value }) => {
  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      align={{ base: 'center', lg: 'start' }}
      p={8}
      spacing={4}
      bg="white"
      rounded="lg"
      shadow="base"
    >
      <HStack align={{ base: 'center', lg: 'start' }} spacing={4}>
        <WAvatar size="2xl" src={``} name={value} />
        <Stack>
          <Heading textAlign="center" size="md" as="h3" fontWeight={900}>
            {label}
          </Heading>
          <Text fontSize="sm">{value}</Text>
        </Stack>
      </HStack>
    </Stack>
  )
}
