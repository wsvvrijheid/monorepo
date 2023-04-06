import { FC } from 'react'

import { Heading, Stack, Text } from '@chakra-ui/react'

import { AcademyCard } from '../../academy'
import { Container } from '../../components'

const image = 'https://placehold.co/256x256'
const academyProjects = [
  {
    title: 'Courses',
    href: '/platforms/academy/courses',
  },
  {
    title: 'Software',
    href: '/platforms/academy/software',
  },
  {
    title: 'Seminars',
    href: '/platforms/academy/seminars',
  },
]

export const AcademyTemplate: FC = () => {
  return (
    <Container maxW="container.lg">
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
        <Stack
          justifyContent="center"
          direction="row"
          flexWrap="wrap"
          gap={6}
          py={10}
        >
          {academyProjects.map(project => (
            <AcademyCard image={image} key={project.title} href={project.href}>
              {project.title}
            </AcademyCard>
          ))}
        </Stack>
      </Stack>
    </Container>
  )
}
