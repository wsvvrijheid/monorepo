import { FC } from 'react'

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { NextSeoProps } from 'next-seo'
import { useLocalStorage } from 'usehooks-ts'

import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale, Tweet } from '@wsvvrijheid/types'
import { AdminLayout, Container, MasonryGrid, TweetCard } from '@wsvvrijheid/ui'

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

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

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
      ...(await ssrTranslations(locale, ['admin', 'model'])),
    },
  }
}

export default TweetBookmarkedPage
