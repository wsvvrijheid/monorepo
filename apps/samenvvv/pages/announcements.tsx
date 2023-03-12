import { FC } from 'react'

import { Link, Text } from '@chakra-ui/react'
import { QueryClient } from '@tanstack/react-query'
import { SITE_URL } from '@wsvvrijheid/config'
import { searchModel, SearchModelArgs } from '@wsvvrijheid/services'
import {
  Hashtag,
  StrapiCollectionResponse,
  StrapiLocale,
} from '@wsvvrijheid/types'
import { Container, Hero } from '@wsvvrijheid/ui'
import {
  getItemLink,
  getOgImageSrc,
  mapHashtagToOgParams,
} from '@wsvvrijheid/utils'
import { isPast } from 'date-fns'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'

import { Layout, HashtagAnnouncement } from '../components'
import i18nConfig from '../next-i18next.config'

type HashtagEventsProps = {
  seo: NextSeoProps
  source: MDXRemoteSerializeResult
  hashtag: Hashtag
  hasStarted: boolean
  link: string
}

const AnnouncementEvent: FC<HashtagEventsProps> = ({
  seo,
  source,
  hashtag,
  hasStarted,
  link,
}) => {
  const { t } = useTranslation()

  return (
    <Layout seo={seo} isDark>
      <Head>
        <meta
          property="twitter:image:src"
          content={seo.openGraph.images[0].url}
        />
      </Head>
      <Hero title={seo.title as string} isFullHeight={false} />
      <Container overflowX="hidden">
        {/* {source && (
          <Box my={8} maxW="container.md" mx="auto" textAlign="center">
            <Markdown source={source} />
          </Box>
        )} */}
        {!hasStarted ? (
          <HashtagAnnouncement hashtag={hashtag} link={link} />
        ) : (
          <>
            <Text color={'primary'} m={4}>
              {t('join-previous-hashtag')}
            </Text>
            <Link href={link}>
              <Text fontWeight={'bold'} color={'primary'} m={4}>
                {t('join-link')}
              </Text>
            </Link>
          </>
        )}
      </Container>
    </Layout>
  )
}

export default AnnouncementEvent

export const getServerSideProps: GetServerSideProps = async context => {
  const locale = context.locale as StrapiLocale
  const queryClient = new QueryClient()

  const ssrTranslations = await serverSideTranslations(
    locale as StrapiLocale,
    ['common'],
    i18nConfig,
  )

  const args: SearchModelArgs<Hashtag> = {
    url: 'api/hashtags',
    locale,
    statuses: ['approved'],
    pageSize: 1,
  }

  const queryKey = Object.values(args)

  await queryClient.prefetchQuery(queryKey, () => searchModel<Hashtag>(args))

  const hashtagsResponse =
    queryClient.getQueryData<StrapiCollectionResponse<Hashtag[]>>(queryKey)

  const hashtag = hashtagsResponse?.data[0]

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

  const twitterHandle = {
    en: '@samenvvvEn',
    nl: '@samenvvv',
    tr: '@samenvvvTr',
  }

  if (!hashtag) {
    return {
      notFound: true,
    }
  }

  const announcementTitle = hashtag?.title.slice(0, 20) || ''
  const announcementDescription = hashtag?.description || ''

  const link = getItemLink(hashtag, locale, 'hashtag') as string

  const ogParams = mapHashtagToOgParams(hashtag, locale)

  const imgSrc = SITE_URL + getOgImageSrc(ogParams)

  const images = imgSrc
    ? [
        {
          url: imgSrc,
          secureUrl: imgSrc,
          type: 'image/jpg',
          width: 1200,
          height: 675,
          alt: title[locale],
        },
      ]
    : []

  const seo: NextSeoProps = {
    title: title[locale],
    description: description[locale],
    twitter: {
      cardType: 'summary_large_image',
      site: twitterHandle[locale],
      handle: twitterHandle[locale],
    },
    openGraph: {
      title: announcementTitle,
      description: announcementDescription,
      url: link,
      images,
    },
  }

  const source = (await serialize(hashtag.content)) || null
  const hasStarted = hashtag.date
    ? isPast(new Date(hashtag.date as string))
    : false

  return {
    props: {
      ...ssrTranslations,
      seo,
      source,
      hashtag,
      hasStarted,
      link,
    },
  }
}
