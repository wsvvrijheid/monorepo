import { FC } from 'react'

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { NextSeoProps } from 'next-seo'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { RecommendedTweet, StrapiLocale } from '@wsvvrijheid/types'
import { AdminLayout, MasonryGrid, RecommendedTweetCard } from '@wsvvrijheid/ui'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const RecommendedTweetPage: FC<PageProps> = ({ seo }) => {
  const { locale } = useRouter()

  const { data: tweets, isLoading } = useStrapiRequest<RecommendedTweet>({
    url: 'api/recommended-tweets',
    locale,
  })

  return (
    <AdminLayout seo={seo} isLoading={isLoading}>
      <MasonryGrid cols={[1, 1, 1, 2, 3, 4]}>
        {tweets?.data?.map((tweet, key) => (
          <RecommendedTweetCard tweet={tweet} key={key} />
        ))}
      </MasonryGrid>
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const title = {
    en: 'Recommended Tweets',
    tr: 'Tavsiye Tweetler',
    nl: 'Aanbevolen Tweets',
  }

  const seo: NextSeoProps = {
    title: title[locale],
  }

  return {
    props: {
      seo,
      ...(await ssrTranslations(locale, ['admin'])),
    },
  }
}

export default RecommendedTweetPage
