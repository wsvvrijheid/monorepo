import { Box, Link, Text } from '@chakra-ui/react'
import { QueryClient } from '@tanstack/react-query'
import { SITE_URL } from '@wsvvrijheid/config'
import {
  searchModel,
  SearchModelArgs,
  useSearchModel,
} from '@wsvvrijheid/services'
import { Hashtag, StrapiLocale } from '@wsvvrijheid/types'
import { Container, Hero, Markdown } from '@wsvvrijheid/ui'
import { getItemLink, getOgImageSrc } from '@wsvvrijheid/utils'
import { isPast } from 'date-fns'
import * as dateFns from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'
import { useTranslation } from 'react-i18next'

import i18nConfig from '..//next-i18next.config'
import { Layout } from '../components'
import { HashtagAnnouncement } from '../components/HashtagAnnouncement' //TODO fix import style
interface HashtagEventsProps {
  hashtags: Hashtag[]
  seo: NextSeoProps
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

const AnnouncementEvent = ({ seo, source }: HashtagEventsProps) => {
  const { locale } = useRouter()
  const { t } = useTranslation()
  const hashtagsQuery = useSearchModel<Hashtag>({
    url: 'api/hashtags',
    locale: locale as StrapiLocale,
    pageSize: 1,
  })

  const latestHashtag = hashtagsQuery?.data?.data?.[0] || null
  const link = getItemLink(latestHashtag, latestHashtag?.locale, 'hashtag')

  const hashtag = hashtagsQuery?.data?.data?.[0]

  const hasStarted = isPast(new Date(hashtag?.date as string))

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
        {source && (
          <Box my={8} maxW="container.md" mx="auto" textAlign="center">
            <Markdown source={source} />
          </Box>
        )}
        {!hasStarted ? (
          <HashtagAnnouncement hashtag={hashtag} link={link} />
        ) : (
          <>
            {' '}
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
type HashtagData = {
  data: Hashtag[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
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
  const newHashtag = hashtags as HashtagData | any

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
  const twitterHandle = {
    en: '@samenvvvEn',
    nl: '@samenvvv',
    tr: '@samenvvvTr',
  }
  const hashtag = newHashtag?.data[0]

  const announcementTitle = hashtag?.title.slice(0, 20) || ''
  const announcementDescription = hashtag?.description || ''
  const image =
    'https://www.simplilearn.com/ice9/free_resources_article_thumb/COVER-IMAGE_Digital-Selling-Foundation-Program.jpg'

  const src =
    'https://www.simplilearn.com/ice9/free_resources_article_thumb/COVER-IMAGE_Digital-Selling-Foundation-Program.jpg'
  const link = getItemLink(hashtag, locale, 'announcement') as string

  const newDate = new Date(hashtag?.date as string)

  const capsContent = {
    en: { title: '📢ETİKET DUYURUSU📢', topic: 'Topic: ', date: 'Date: ' },
    nl: {
      title: '📢TAG AANKONDIGING📢',
      topic: 'Onderwerp: ',
      date: 'Datum: ',
    },
    tr: { title: '📢TAG ANNOUNCEMENT📢', topic: 'Konu: ', date: 'Tarih: ' },
  }

  const imgSrc =
    SITE_URL +
    getOgImageSrc({
      title: `${capsContent[locale].title}`,
      text: `${capsContent[locale].topic} ${hashtag?.description}\n\n${
        capsContent[locale].date
      } ${dateFns.format(newDate, 'dd MMMM yyyy')}\n\n 🇳🇱 ${dateFns.format(
        newDate,
        'HH:mm',
      )} \n 🇹🇷  ${formatInTimeZone(newDate, 'Europe/Istanbul', 'HH:mm')} \n\n`,
      image: src,
      shape: 0,
      bg: 'white',
      color: 'black',
      flip: true,
      hasLine: true,
      scale: 0.5,
    })

  const images = image
    ? [
        {
          url: imgSrc,
          secureUrl: imgSrc,
          type: image as string,
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

  const source = (await serialize(content[locale].trim())) || null

  return {
    props: {
      ...(await serverSideTranslations(
        locale as StrapiLocale,
        ['common'],
        i18nConfig,
      )),
      hashtags,
      link,
      imgSrc,
      seo,
      source,
    },
  }
}
