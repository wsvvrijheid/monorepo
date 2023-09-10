import { useEffect } from 'react'

import { Modal, useDisclosure } from '@chakra-ui/react'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import { ASSETS_URL, SITE_URL } from '@wsvvrijheid/config'
import { strapiRequest } from '@wsvvrijheid/lib'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { RecommendedTopic, StrapiLocale } from '@wsvvrijheid/types'
import { Layout, TopicCard } from '@wsvvrijheid/ui'
import {
  getItemLink,
  getLocalizedSlugs,
  getOgImageSrc,
  getPageSeo,
} from '@wsvvrijheid/utils'

const Page = ({ topic, topics, seo }) => {
  const { query, push } = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (query.id) {
      onOpen()
    }
  }, [query.id])

  const handleClose = () => {
    onClose()
  }

  // It is for single topic
  return (
    <Layout seo={seo}>
      <NextSeo {...seo} />

      <Modal isOpen={isOpen} onClose={handleClose} />
      {topics?.map(topic => <TopicCard key={topic.id} topic={topic} />)}
      {topic && <TopicCard key={topic.id} topic={topic} />}
    </Layout>
  )
}
export default Page

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale
  // const slug = context.params?.slug as string
  const { req } = context

  const queryClient = new QueryClient()
  // const queryKey = ['news', locale, slug]

  const id = context.query.id as string

  let recommendedTopic: RecommendedTopic | null = null
  let seo = getPageSeo(recommendedTopic, locale, 'news')

  if (id) {
    // Fetch recommended-topic by id
    const topic = await strapiRequest<RecommendedTopic>({
      url: 'api/recommended-topics',
      id: Number(id),
    })
    recommendedTopic = topic.data
    // seo => If id is provided seo will be single topic seo
  }

  // fetch topics
  const response = await strapiRequest<RecommendedTopic>({
    url: 'api/recommended-topics',
  })
  const recommendedTopics = response.data
  // const destination = `/${locale}/recommmends/news/?id=${news.id}`

  let capsSrc = ''

  if (recommendedTopic) {
    const title = recommendedTopic?.description?.slice(0, 20) || ''
    const description = recommendedTopic.description || ''
    const image = recommendedTopic?.image

    let src = image
    const link = getItemLink(
      recommendedTopic,
      locale,
      'recommendedTopic',
    ) as string

    if (image?.formats?.small) {
      src = image.formats.small.url
    } else if (image?.formats?.medium) {
      src = image.formats.medium.url
    } else if (image?.formats?.large) {
      src = image.formats.large.url
    }

    capsSrc =
      SITE_URL +
      getOgImageSrc({
        title: recommendedTopic.title,
        text: recommendedTopic.description || undefined,
        image: src ? `${ASSETS_URL}${src}` : undefined,
        ...recommendedTopic.imageParams,
      })
    // }

    const images = image && [
      {
        url: capsSrc,
        secureUrl: capsSrc,
        type: image?.mime as string,
        width: 1200,
        height: 675,
        alt: title,
      },
    ]

    const twitterHandle = {
      en: '@samenvvvEn',
      nl: '@samenvvv',
      tr: '@samenvvvTr',
    }

    seo = {
      title,
      description,
      twitter: {
        cardType: 'summary_large_image',
        site: twitterHandle[locale],
        handle: twitterHandle[locale],
      },
      openGraph: {
        title,
        description,
        url: link,
        images,
      },
    }
  }

  const userAgent = req.headers['user-agent'] as string
  const isIOS = /iPad|iPhone|iPod/.test(userAgent)
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent)
  const isIosSafari = isIOS && isSafari

  const slugs = getLocalizedSlugs(recommendedTopics, locale)

  return {
    props: {
      seo,
      topic: recommendedTopic,
      topics: recommendedTopics,
      capsSrc: capsSrc || null,
      isIosSafari,
      slugs,
      dehydratedState: dehydrate(queryClient),
      ...(await ssrTranslations(locale)),
    },
  }
}
