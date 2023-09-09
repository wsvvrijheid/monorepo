import { FC } from 'react'

import { SimpleGrid } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { NextSeoProps } from 'next-seo'
import { useLocalStorage } from 'usehooks-ts'

import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale, TopicBase } from '@wsvvrijheid/types'
import { AdminLayout, TopicCard } from '@wsvvrijheid/ui'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const NewsBookmarkedPage: FC<PageProps> = ({ seo }) => {
  const [bookmarksStorage] = useLocalStorage<TopicBase[]>('bookmarks', [])

  return (
    <AdminLayout seo={seo}>
      <SimpleGrid columns={{ base: 1 }} gap={4}>
        {bookmarksStorage?.map(topic => (
          <TopicCard key={topic.url} topic={topic} />
        ))}
      </SimpleGrid>
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const title = {
    en: 'Bookmarked News',
    tr: 'Yer İşaretli Haberler',
    nl: 'Bladwijzer Nieuws',
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

export default NewsBookmarkedPage
