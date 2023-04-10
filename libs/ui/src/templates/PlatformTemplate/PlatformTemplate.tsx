import { FC } from 'react'

import {
  Box,
  Button,
  Center,
  Heading,
  Link,
  Stack,
  SimpleGrid,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { NextSeoProps } from 'next-seo'
import { FaExternalLinkAlt } from 'react-icons/fa'

import { UploadFile } from '@wsvvrijheid/types'

import { AcademyCard } from '../../academy'
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
  const router = useRouter()
  const { slug } = router.query

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
        {slug === 'academy' && (
          <Box w="100%" p={2}>
            <SimpleGrid columns={{ base: 1, sm: 3 }} gap={6}>
              <AcademyCard
                image="https://api.wsvvrijheid.nl/uploads/courses_image_3c3a1382bd.png"
                href="/platforms/academy/courses"
                // description=''
              >
                {t('courses')}
              </AcademyCard>
              <AcademyCard
                image="https://api.wsvvrijheid.nl/uploads/software_card_f3408ac222.jpeg"
                href="/platforms/academy/software"
                // description=''
              >
                {t('software')}
              </AcademyCard>
              <AcademyCard
                image="https://api.wsvvrijheid.nl/uploads/Seminars_card_0a3a008777.jpeg"
                href="/platforms/academy/seminars"
                // description=''
              >
                {t('seminars')}
              </AcademyCard>
            </SimpleGrid>
          </Box>
        )}
      </Stack>
    </Container>
  )
}
