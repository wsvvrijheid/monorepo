import { SimpleGrid } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { i18nConfig } from '@wsvvrijheid/config'
import { strapiRequest } from '@wsvvrijheid/lib'
import { Collection, StrapiLocale, UploadFile } from '@wsvvrijheid/types'
import { Card, Container, Hero } from '@wsvvrijheid/ui'

import { Layout } from '../../../components'

type CollectionsPageProps = InferGetStaticPropsType<typeof getStaticProps>

const CollectionsPage: NextPage<CollectionsPageProps> = ({
  seo,
  collections,
}) => {
  const { locale } = useRouter()

  return (
    <Layout seo={seo} isDark>
      <Hero title={seo.title} />
      <Container minH="inherit" py={{ base: 8, lg: 16 }}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4}>
          {collections?.data?.map((collection, i) => (
            <Card
              key={i}
              title={collection.title}
              image={collection.image as UploadFile}
              description={collection.description as string}
              link={`/${locale}/club/collections/${collection.slug}`}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  )
}
export default CollectionsPage

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const collections = await strapiRequest<Collection>({
    url: 'api/collections',
    locale,
  })

  if (!collections?.data) return { notFound: true }

  const title = {
    en: 'Collections',
    nl: 'Collecties',
    tr: 'Koleksiyonlar',
  }

  const seo = {
    title: title[locale],
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
      seo,
      collections,
    },
    revalidate: 1,
  }
}
