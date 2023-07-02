import { FC, useEffect, useRef, useState } from 'react'

import { useBreakpointValue } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { getCollectionBySlug, getModelStaticPaths } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Localize, StrapiLocale } from '@wsvvrijheid/types'
import { CollectionTemplate } from '@wsvvrijheid/ui'

import { Layout } from '../../../components/Layout'

type CollectionPageProps = InferGetStaticPropsType<typeof getStaticProps>

const CollectionPage: FC<CollectionPageProps> = ({ seo, collection }) => {
  const pageShow = useBreakpointValue({ base: 1, lg: 2 }) as number
  const centerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (centerRef.current && pageShow) {
      const center = centerRef.current

      setTimeout(() => {
        setHeight(center.offsetHeight - 60)
        setWidth(center.offsetWidth)
        setIsLoading(false)
      }, 1000)
    }
  }, [centerRef, pageShow])

  if (!collection) return null

  return (
    <Layout seo={seo}>
      <CollectionTemplate
        centerRef={centerRef}
        height={height}
        width={width}
        isLoading={isLoading}
        collection={collection}
        pageShow={pageShow}
      />
    </Layout>
  )
}
export default CollectionPage

export const getStaticPaths = async () => {
  return await getModelStaticPaths('api/collections')
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const slug = context.params?.slug as string

  const collection = await getCollectionBySlug(locale, slug)

  if (!collection) return { notFound: true }

  const slugs =
    collection.localizations?.reduce((acc, l) => {
      acc[l.locale] = l.slug

      return acc
    }, {} as Localize<string>) || {}

  const title = collection.title || ''

  const seo = {
    title,
  }

  return {
    props: {
      ...(await ssrTranslations(locale)),
      seo,
      slugs: { ...slugs, [locale]: slug },
      collection,
    },
    revalidate: 1,
  }
}
