import { FC } from 'react'

import { SimpleGrid } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { NextSeoProps } from 'next-seo'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { RecommendedTopic, StrapiLocale } from '@wsvvrijheid/types'
import { AdminLayout, TopicCard } from '@wsvvrijheid/ui'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const NewsBookmarkedPage: FC<PageProps> = ({ seo }) => {
  const { locale } = useRouter()

  const { data } = useStrapiRequest<RecommendedTopic>({
    endpoint: 'recommended-topics',
    locale,
  })

  return (
    <AdminLayout seo={seo}>
      <SimpleGrid columns={{ base: 1 }} gap={4}>
        {data?.data?.map(topic => (
          <TopicCard
            key={topic.url}
            topic={{ ...topic, isRecommended: true }}
          />
        ))}
      </SimpleGrid>
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const title = {
    en: 'Recommended News',
    tr: 'Tavsite Haberler',
    nl: 'Aanbevolen Nieuws',
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
