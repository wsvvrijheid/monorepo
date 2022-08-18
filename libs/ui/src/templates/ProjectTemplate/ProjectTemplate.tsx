import { FC } from 'react'

import { Box, Button, Center, Heading, Stack } from '@chakra-ui/react'
import { UploadFile } from '@wsvvrijheid/types'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { NextSeoProps } from 'next-seo'
import { useTranslation } from 'react-i18next'
import { FaExternalLinkAlt } from 'react-icons/fa'

import { Container, Navigate, Markdown, WImage } from '../../components'

export type ProjectTemplateProps = {
  seo: NextSeoProps
  source: MDXRemoteSerializeResult
  image: UploadFile | string
  link: string
}

export const ProjectTemplate: FC<ProjectTemplateProps> = ({
  seo,
  source,
  image,
  link,
}) => {
  const { t } = useTranslation()

  if (!source) return null

  return (
    <Container maxW="container.md">
      <Stack py={8} spacing={8} align="center">
        <Box boxSize={300}>
          <WImage
            src={image}
            rounded="full"
            shadow="md"
            alt={seo.title as string}
            ratio={1}
          />
        </Box>

        <Heading as="h1" textAlign="center">
          {seo.title}
        </Heading>
        <Box textAlign={{ base: 'left', lg: 'justify' }}>
          <Markdown source={source} />
        </Box>
        <Center>
          {!!link && (
            <Navigate href={link}>
              <Button
                colorScheme="blue"
                size="lg"
                rightIcon={<FaExternalLinkAlt />}
              >
                {t('visit-website')}
              </Button>
            </Navigate>
          )}
        </Center>
      </Stack>
    </Container>
  )
}
