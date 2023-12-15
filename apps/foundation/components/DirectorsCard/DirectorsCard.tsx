import { FC } from "react"

import { Stack, Heading, Spacer,Text } from "@chakra-ui/react"

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
      <Stack align={{ base: 'center', lg: 'start' }}>
        <Heading textAlign="center" size="md" as="h3" fontWeight={900}>
          {label}
        </Heading>
        <Text fontSize="sm">{value}</Text>
        <Spacer />
      </Stack>
    </Stack>
  )
}
