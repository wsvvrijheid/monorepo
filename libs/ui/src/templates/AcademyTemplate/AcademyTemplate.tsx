import { FC } from 'react'

import { Heading, Stack, Text, Box } from '@chakra-ui/react'
import { NextSeoProps } from 'next-seo'

import { UploadFile } from '@wsvvrijheid/types'

import { AcademyCard } from '../../academy'
import { Container, WImage } from '../../components'

const placeholder = 'https://placehold.co/256x256'
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

export type AcademyTemplateProps = {
  seo: NextSeoProps
  image: UploadFile | string
}

export const AcademyTemplate: FC<AcademyTemplateProps> = ({ seo, image }) => {
  return (
    <Container maxW="container.lg">
      <Stack py={8} spacing={8} align="center">
        <Box boxSize={300}>
          <WImage
            src={image}
            rounded="full"
            shadow="base"
            alt={seo.title as string}
            ratio={1}
          />
        </Box>
        <Heading as="h1" size="2xl">
          {seo.title}
        </Heading>
        <Text>{seo.description}</Text>
        <Stack
          justifyContent="center"
          direction="row"
          flexWrap="wrap"
          gap={6}
          py={10}
        >
          {academyProjects.map(project => (
            <AcademyCard
              image={placeholder}
              key={project.title}
              href={project.href}
            >
              {project.title}
            </AcademyCard>
          ))}
        </Stack>
      </Stack>
    </Container>
  )
}
