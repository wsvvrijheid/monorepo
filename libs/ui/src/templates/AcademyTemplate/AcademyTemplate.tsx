import { FC } from 'react'

import { HStack, Heading, Stack, Text } from '@chakra-ui/react'

import { AcademyCard } from '../../academy'
import { Container } from '../../components'

export const AcademyTemplate: FC = () => {
  return (
    <Container maxW="container.md">
      <Stack py={8} spacing={8} align="center">
        <Heading as="h1" size="2xl">
          Wees Academy
        </Heading>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
          placeat ex distinctio rerum consequatur amet necessitatibus voluptates
          corporis, quod voluptatem officiis, doloremque eius natus cumque
          facilis voluptatibus, culpa aut dolor?
        </Text>
        <HStack>
          <AcademyCard>Courses</AcademyCard>
          <AcademyCard>Software Development</AcademyCard>
          <AcademyCard>Seminar</AcademyCard>
        </HStack>
      </Stack>
    </Container>
  )
}
