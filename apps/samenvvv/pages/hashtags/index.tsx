import { Box, Stack } from '@chakra-ui/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'

import { i18nConfig } from '@wsvvrijheid/config'
import { RequestCollectionArgs, strapiRequest } from '@wsvvrijheid/lib'
import { useRequestCollection } from '@wsvvrijheid/services'
import { Hashtag, StrapiLocale } from '@wsvvrijheid/types'
import {
  AnimatedBox,
  Container,
  HashtagCard,
  Hero,
  Markdown,
} from '@wsvvrijheid/ui'

import { Layout } from '../../components'

type HashtagEventsProps = InferGetStaticPropsType<typeof getStaticProps>

const HashtagEvents = ({ seo, source }: HashtagEventsProps) => {
  const router = useRouter()

  const hashtagsQuery = useRequestCollection<Hashtag>({
    url: 'api/hashtags',
    locale: router.locale,
    filters: {
      approvalStatus: { $eq: 'approved' },
    },
    sort: ['date:desc'],
  })

  return (
    <Layout seo={seo} isDark>
      <Hero
        title={seo.title as string}
        isFullHeight={false}
        image={'/images/hashtags-bg.jpeg'}
      />
      <Container overflowX="hidden">
        {source && (
          <Box my={8} maxW="container.md" mx="auto" textAlign="center">
            <Markdown source={source} />
          </Box>
        )}

        <Stack spacing={12} mb={12}>
          {hashtagsQuery.data?.data?.map((hashtag, i) => (
            <AnimatedBox
              directing={i % 2 === 0 ? 'to-left' : 'to-right'}
              delay={3}
              key={i}
            >
              <Box rounded="lg" overflow="hidden" bg="white" shadow="primary">
                <HashtagCard item={hashtag} type="hashtag" />
              </Box>
            </AnimatedBox>
          ))}
        </Stack>
      </Container>
    </Layout>
  )
}

export default HashtagEvents

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale
  const queryClient = new QueryClient()

  const args: RequestCollectionArgs = {
    url: 'api/hashtags',
    locale,
    filters: {
      status: { $eq: 'approved' },
    },
    sort: ['date:desc'],
  }

  const queryKey = Object.entries(args)

  await queryClient.prefetchQuery(queryKey, () => strapiRequest<Hashtag>(args))

  const title = {
    en: 'Hashtags',
    nl: 'Hashtags',
    tr: 'Hashtag Etiketleri',
  }

  const description = {
    en: '',
    nl: '',
    tr: '',
  }

  const content = {
    en: ``,
    nl: ``,
    tr: ``,
  }

  const seo: NextSeoProps = {
    title: title[locale],
    description: description[locale],
  }

  const source = (await serialize(content[locale].trim())) || null

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
      seo,
      source,
    },
  }
}
