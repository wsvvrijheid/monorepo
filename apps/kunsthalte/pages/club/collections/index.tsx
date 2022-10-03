import { SimpleGrid } from '@chakra-ui/react'
import { Collection, StrapiLocale } from '@wsvvrijheid/types'
import { Card, Container, Hero } from '@wsvvrijheid/ui'
import { getAllCollections } from '@wsvvrijheid/utils'
import { GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { useRouter } from 'next/router'

import { Layout } from '../../../components'
import i18nConfig from '../../../next-i18next.config'

type CollectionsPageProps = {
  seo: NextSeoProps
  collections: Collection[]
}

const CollectionsPage: NextPage<CollectionsPageProps> = ({
  seo,
  collections,
}) => {
  const { locale } = useRouter()
  return (
    <Layout seo={seo} isDark>
      <Hero title={seo.title} />
      <Container minH="inherit" py={{ base: 8, lg: 16 }}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }}>
          {collections.map((collection, i) => (
            <Card
              key={i}
              title={collection.title}
              image={collection.image?.url}
              description={collection.description}
              link={`/${locale}/club/collections/${collection.slug}`}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  )
}
export default CollectionsPage

export const getStaticProps: GetStaticProps = async context => {
  const locale = context.locale as StrapiLocale

  const collections = await getAllCollections(locale)

  if (!collections) return { notFound: true }

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
  }
}
