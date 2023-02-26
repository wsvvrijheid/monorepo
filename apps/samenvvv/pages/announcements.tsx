import { Box, Stack, Text } from '@chakra-ui/react'
import { QueryClient } from '@tanstack/react-query'
import {
  searchModel,
  SearchModelArgs,
  useSearchModel,
} from '@wsvvrijheid/services'
import { Hashtag, StrapiLocale } from '@wsvvrijheid/types'
import { Container, Hero, Markdown } from '@wsvvrijheid/ui'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'

import i18nConfig from '..//next-i18next.config'
import { Layout } from '../components'

interface HashtagEventsProps {
  hashtags: Hashtag[]
  seo: NextSeoProps
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

const HashtagEvents = ({ seo, source }: HashtagEventsProps) => {
  const router = useRouter()

  const hashtagsQuery = useSearchModel<Hashtag>({
    url: 'api/hashtags',
    locale: router.locale as StrapiLocale,
  })
  // const anounscements = samen_aonounscement
  //const samenAnounscement = {}
  const hashtag = hashtagsQuery?.data?.data?.[0] //get newest hashtag here
  const hashtagAnounscements = {
    title: 'ETKINLIK DUYURUSU',
    topic: hashtag?.title,
    description: hashtag?.description,
    date: hashtag?.date,
    defaultCaps: '',
    hashtag:
      hashtag?.hashtagDefault ||
      hashtag?.hashtagExtra ||
      'Hashtag saatinde yayinlanacak',
  }

  //console.log('samen anounscement', anounscements)
  console.log('samen anounscement >>', hashtagAnounscements)

  return (
    <Layout seo={seo} isDark>
      <Hero title={seo.title as string} isFullHeight={false} />
      <Container overflowX="hidden">
        {source && (
          <Box my={8} maxW="container.md" mx="auto" textAlign="center">
            <Markdown source={source} />
          </Box>
        )}

        <Stack spacing={12} mb={12}>
          <Text>Announscements</Text>
        </Stack>
      </Container>
    </Layout>
  )
}

export default HashtagEvents

export const getStaticProps: GetStaticProps = async context => {
  const locale = context.locale as StrapiLocale
  const queryClient = new QueryClient()

  const args: SearchModelArgs<Hashtag> = {
    url: 'api/hashtags',
    locale,
    statuses: ['approved'],
  }

  const queryKey = Object.values(args)

  await queryClient.prefetchQuery(queryKey, () => searchModel<Hashtag>(args))

  const hashtags = queryClient.getQueryData<Hashtag[]>(queryKey)

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
      ...(await serverSideTranslations(
        locale as StrapiLocale,
        ['common'],
        i18nConfig,
      )),
      hashtags,
      seo,
      source,
    },
  }
}
