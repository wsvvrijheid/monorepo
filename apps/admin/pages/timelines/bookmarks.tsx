import { FC } from 'react'

import { Tweet } from '@wsvvrijheid/types'
import { AdminLayout, Container, MasonryGrid, TweetCard } from '@wsvvrijheid/ui'
import { InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { useLocalStorage } from 'usehooks-ts'

import i18nConfig from '../../next-i18next.config'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const TweetBookmarkedPage: FC<PageProps> = ({ seo }) => {
  const [storageTweets] = useLocalStorage<Tweet[]>('bookmarked-tweets', [])

  return (
    <AdminLayout seo={seo}>
      <Container>
        <MasonryGrid cols={[1, 1, 1, 2, 3]}>
          {storageTweets.map((tweet, key) => (
            <TweetCard tweet={tweet} key={key} editable />
          ))}
        </MasonryGrid>
      </Container>
    </AdminLayout>
  )
}

export const getStaticProps = async context => {
  const { locale } = context

  const title = {
    en: 'Bookmarked Tweets',
    tr: 'Yer İşaretli Tweetler',
    nl: 'Bladwijzer Tweets',
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

export default TweetBookmarkedPage
