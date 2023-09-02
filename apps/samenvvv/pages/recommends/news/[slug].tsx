import { QueryClient, dehydrate } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { GetServerSidePropsContext } from 'next'

import { ASSETS_URL, SITE_URL } from '@wsvvrijheid/config'
import { strapiRequest } from '@wsvvrijheid/lib'
import { getHashtagSentences } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { RecommendedTopic, RecommendedTweet, StrapiLocale } from '@wsvvrijheid/types'
import { getItemLink, getLocalizedSlugs, getOgImageSrc, getPageSeo } from '@wsvvrijheid/utils'

const Page = () => null

export default Page

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
 const locale = context.locale as StrapiLocale
  // const slug = context.params?.slug as string
  const { req, res, query } = context
  const adminMode = getCookie('admin-mode', { req, res })

  const queryClient = new QueryClient()
  // const queryKey = ['news', locale, slug]

  
  const id = context.params?.id as string

  const response = await strapiRequest<RecommendedTopic>({
    url: 'api/recommended-topics',
    id: Number(id),
  })

  const news = response.data
console.log("news", news)

  if (!news) {
    return { notFound: true }
  }

 // const destination = `/${locale}/recommmends/news/?id=${news.id}`
 // arrange seo

 
let seo = getPageSeo(news, locale, 'news')
  let capsSrc = ''

  if (news) {
    const title = news?.description?.slice(0, 20) || ''
    const description = news.description || ''
    const image = news?.image
   // const caps = news?.image?.url

    let src = image
    const link = getItemLink(news, locale, 'news') as string

    //  if (caps) {
    //    capsSrc = `${ASSETS_URL}${caps}`
    //  } else {
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
          title: news.title,
          text: news.description || undefined,
          image: src ? `${ASSETS_URL}${src}` : undefined,
          ...news.imageParams,
        })
   // }

    const images = image && [
      {
        url: capsSrc,
        secureUrl: capsSrc,
        type: image.mime as string,
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

  await queryClient.prefetchQuery({
    queryKey: ['kv-hashtag-sentences', news.id],
    queryFn: () => getHashtagSentences(news.id),
    staleTime: 1000 * 60,
  })

  const slugs = getLocalizedSlugs(news, locale)

  return {
    props: {
      seo: {
        ...seo,
      },
      capsSrc: capsSrc || null,
      news: news || null,
      isIosSafari,
      isAdminMode: adminMode === true,
      slugs,
     // hasStarted: hashtag.hasStarted,
      dehydratedState: dehydrate(queryClient),
      ...(await ssrTranslations(locale)),
    },
  }
}
