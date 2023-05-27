import { FC } from 'react'

import { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { useSearchModel } from '@wsvvrijheid/services'
import { RecommendedTweet, StrapiLocale } from '@wsvvrijheid/types'
import { AdminLayout, MasonryGrid, RecommendedTweetCard } from '@wsvvrijheid/ui'

import i18nConfig from '../../next-i18next.config'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const RecommendedTweetPage: FC<PageProps> = ({ seo }) => {
  const { locale } = useRouter()

  const { data: tweets, isLoading } = useSearchModel<RecommendedTweet>({
    url: 'api/recommended-tweets',
    locale: locale as StrapiLocale,
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

export const getStaticProps = async context => {
  const { locale } = context

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
      ...(await serverSideTranslations(
        locale,
        ['common', 'admin'],
        i18nConfig,
      )),
    },
  }
}

export default RecommendedTweetPage
