import { Box, Link, Text } from '@chakra-ui/react'
import { QueryClient } from '@tanstack/react-query'
import {
  searchModel,
  SearchModelArgs,
  useSearchModel,
} from '@wsvvrijheid/services'
import { Hashtag, StrapiLocale } from '@wsvvrijheid/types'
import { Container, Hero, Markdown, useAnnoucementData } from '@wsvvrijheid/ui'
import { getItemLink } from '@wsvvrijheid/utils'
import { isPast } from 'date-fns'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'

import i18nConfig from '..//next-i18next.config'
import { Layout } from '../components'
import { Announcement } from '../components/Announcement/announcement' //TODO fix import style

interface HashtagEventsProps {
  hashtags: Hashtag[]
  seo: NextSeoProps
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

const HashtagEvents = ({ seo, source }: HashtagEventsProps) => {
  const { locale } = useRouter()
  const hashtagsQuery = useSearchModel<Hashtag>({
    url: 'api/hashtags',
    locale: locale as StrapiLocale,
    pageSize: 1,
  })

  const latestHashtag = hashtagsQuery?.data?.data?.[0] || null
  const link = getItemLink(latestHashtag, latestHashtag?.locale, 'hashtag')

  const hashtag = hashtagsQuery?.data?.data?.[0] //get newest hashtag here

  const hashtagAnounscement = useAnnoucementData(
    hashtag,
    locale as StrapiLocale,
  )

  // const hasPassed = isPast(addDays(new Date(hashtag?.date as string), 1))
  const hasStarted = isPast(new Date(hashtag?.date as string))
  //const today = new Date()
  //format(new Date(hashtag?.date as string), 'dd MMMM yyyy')

  return (
    <Layout seo={seo} isDark>
      <Hero title={seo.title as string} isFullHeight={false} />
      <Container overflowX="hidden">
        {source && (
          <Box my={8} maxW="container.md" mx="auto" textAlign="center">
            <Markdown source={source} />
          </Box>
        )}
        {!hasStarted ? (
          <Announcement
            title={hashtagAnounscement?.title}
            description={hashtagAnounscement?.description}
            date={hashtagAnounscement?.date}
            defaultCaps={hashtagAnounscement?.defaultCaps}
            hashtag={hashtagAnounscement?.hashtag}
            content={hashtagAnounscement?.content}
            join={hashtagAnounscement?.join}
            link={link}
          />
        ) : (
          <Link href={link}>
            <Text fontWeight={'bold'} color={'primary'} m={4}>
              {hashtagAnounscement?.join}
            </Text>
          </Link>
        )}
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
    pageSize: 1,
  }

  const queryKey = Object.values(args)

  await queryClient.prefetchQuery(queryKey, () => searchModel<Hashtag>(args))

  const hashtags = queryClient.getQueryData<Hashtag[]>(queryKey)

  const title = {
    en: 'Hashtag Announcement',
    nl: 'Hashtag Announcement',
    tr: 'Hashtag Duyurulari',
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
