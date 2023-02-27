import { FC } from 'react'

import { useSearchModel } from '@wsvvrijheid/services'
import { RecommendedTweet } from '@wsvvrijheid/types'
import {
  AdminLayout,
  Container,
  MasonryGrid,
  RecommendedTweetCard,
} from '@wsvvrijheid/ui'
import { InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import i18nConfig from '../../next-i18next.config'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const RecommendedTweetPage: FC<PageProps> = ({ seo }) => {
  const { data: tweets, isLoading } = useSearchModel<RecommendedTweet>({
    url: 'api/recommended-tweets',
  })

  return (
    <AdminLayout seo={seo} isLoading={isLoading}>
      <Container>
        <MasonryGrid cols={[1, 1, 1, 2, 3]}>
          {tweets?.data?.map((tweet, key) => (
            <RecommendedTweetCard tweet={tweet} key={key} />
          ))}
        </MasonryGrid>
      </Container>
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
