import { SimpleGrid } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useStrapiRequest } from '@fc/services'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { RecommendedTopic, StrapiLocale } from '@fc/types'
import { AdminLayout, TopicCard } from '@fc/ui'

const NewsBookmarkedPage = () => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  const { data } = useStrapiRequest<RecommendedTopic>({
    endpoint: 'recommended-topics',
    locale,
  })

  return (
    <AdminLayout seo={{ title: t('recommended-news') }}>
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

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}

export default NewsBookmarkedPage
