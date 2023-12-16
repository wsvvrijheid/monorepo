import { FC } from 'react'

import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Link,
  List,
  ListItem,
  SimpleGrid,
  Spinner,
  Stack,
} from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serialize } from 'next-mdx-remote/serialize'
import { FaDonate } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

import { SITE_URL } from '@wsvvrijheid/config'
import { strapiRequest } from '@wsvvrijheid/lib'
import { getModelStaticPaths } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Presentation, StrapiLocale } from '@wsvvrijheid/types'
import { Container, Hero, Markdown, ShareButtons } from '@wsvvrijheid/ui'
import { getLocalizedSlugs } from '@wsvvrijheid/utils'

import { Layout } from '../../components/index'

type PresentationDetailPageProps = InferGetStaticPropsType<
  typeof getStaticProps
>

const PresentationDetailPage: FC<PresentationDetailPageProps> = ({
  seo,
  source,
  image,
  flow,
}) => {
  const { locale, asPath } = useRouter()
  const { t } = useTranslation()

  if (!source) return <Spinner />

  const URL = `${SITE_URL}/${locale}${asPath}`

  return (
    <Layout seo={seo} isDark>
      <Hero title={seo.title} />
      <Container maxW="container.md">
        <Stack py={8} spacing={8}>
          <HStack justifyContent={'end'}>
            <ShareButtons
              url={URL}
              title={seo.title}
              quote={seo?.description || ''}
            />
          </HStack>
          <Box textAlign={{ base: 'left', lg: 'justify' }}>
            <Markdown source={source} />
          </Box>
          {flow.length > 0 && (
            <Stack spacing={4}>
              <Heading as="h2" size="md">
                {t('program-flow')}
              </Heading>
              <List>
                {flow.map((f, i) => (
                  <ListItem key={i}>
                    {[f.title, f.duration, f.presenter]
                      .filter(Boolean)
                      .join(' * ')}
                  </ListItem>
                ))}
              </List>
            </Stack>
          )}
          <SimpleGrid columns={2} alignContent={'center'} gap={4}>
            <Center aspectRatio={1}>
              <Button
                boxSize={'full'}
                variant={'outline'}
                fontSize={'2xl'}
                flexDir={'column'}
                leftIcon={<Box as={FaDonate} mb={4} fontSize={'2em'} />}
              >
                <Link href="/donations">{t('donation.title')}</Link>
              </Button>
            </Center>
            <Center aspectRatio={1}>
              <Button
                boxSize={'full'}
                colorScheme={'samen'}
                variant={'outline'}
                fontSize={'2xl'}
                flexDir={'column'}
                leftIcon={<Box as={FaXTwitter} mb={4} fontSize={'2em'} />}
              >
                <Link href="https://samenvvv.nl">
                  {t('home.post-maker.title')}
                </Link>
              </Button>
            </Center>
          </SimpleGrid>
          {/* TODO: Add images gallery */}
        </Stack>
      </Container>
    </Layout>
  )
}
export default PresentationDetailPage

export const getStaticPaths = async () => {
  return await getModelStaticPaths('presentations')
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale
  const slug = context.params?.['slug'] as string

  const presentationData = await strapiRequest<Presentation>({
    endpoint: 'presentations',
    filters: { slug: { $eq: slug } },
    locale,
  })

  if (!presentationData?.data?.length) return { notFound: true }

  const presentation = presentationData.data[0]

  const slugs = getLocalizedSlugs(presentation, locale)

  const title = presentation.title || ''
  const description = presentation.description || ''
  const content = presentation.content || ''
  const image = presentation.image || ''

  const seo = { title, description }

  const source = await serialize(content || '')

  return {
    props: {
      seo,
      image,
      source,
      slugs,
      flow: presentation.flow || [],
      ...(await ssrTranslations(locale)),
    },
    revalidate: 1,
  }
}
