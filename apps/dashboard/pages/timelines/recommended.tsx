import { FC } from 'react'

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { i18nConfig } from '@wsvvrijheid/config'
import { useRequestCollection } from '@wsvvrijheid/services'
import { RecommendedTweet, StrapiLocale } from '@wsvvrijheid/types'
import { AdminLayout, MasonryGrid, RecommendedTweetCard } from '@wsvvrijheid/ui'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const RecommendedTweetPage: FC<PageProps> = ({ seo }) => {
  const { locale } = useRouter()

  const { data: tweets, isLoading } = useRequestCollection<RecommendedTweet>({
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
      ...(await serverSideTranslations(
        locale,
        ['common', 'admin'],
        i18nConfig,
      )),
    },
  }
}

export default RecommendedTweetPage
