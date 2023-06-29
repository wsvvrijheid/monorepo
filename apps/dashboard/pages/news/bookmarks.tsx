import { FC } from 'react'

import { SimpleGrid } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { useLocalStorage } from 'usehooks-ts'

import { StrapiLocale, TopicBase } from '@wsvvrijheid/types'
import { AdminLayout, TopicCard } from '@wsvvrijheid/ui'

import i18nConfig from '../../next-i18next.config'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const NewsBookmarkedPage: FC<PageProps> = ({ seo }) => {
  const [bookmarksStorage] = useLocalStorage<TopicBase[]>('bookmarks', [])

  return (
    <AdminLayout seo={seo}>
      <SimpleGrid columns={{ base: 1 }} gap={4}>
        {bookmarksStorage?.map((topic, i) => (
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
      ...(await serverSideTranslations(
        locale,
        ['common', 'admin'],
        i18nConfig,
      )),
    },
  }
}

export default NewsBookmarkedPage
