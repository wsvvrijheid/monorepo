import { FC } from 'react'

import { Box, Button, Center, Heading, Link, Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { NextSeoProps } from 'next-seo'
import { FaExternalLinkAlt } from 'react-icons/fa'

import { UploadFile } from '@wsvvrijheid/types'

import { Container, Markdown, WImage } from '../../components'

export type PlatformTemplateProps = {
  seo: NextSeoProps
  source: MDXRemoteSerializeResult
  image: UploadFile | string
  link: string
}

export const PlatformTemplate: FC<PlatformTemplateProps> = ({
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
            shadow="base"
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
            <Button
              as={Link}
              isExternal
              href={link}
              size="lg"
              rightIcon={<FaExternalLinkAlt />}
            >
              {t('visit-website')}
            </Button>
          )}
        </Center>
      </Stack>
    </Container>
  )
}
