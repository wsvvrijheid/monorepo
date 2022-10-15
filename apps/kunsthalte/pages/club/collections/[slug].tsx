import { useEffect, useState } from 'react'
import { useRef } from 'react'

import { useBreakpointValue } from '@chakra-ui/react'
import { Collection } from '@wsvvrijheid/types'
import { CollectionTemplate } from '@wsvvrijheid/ui'
import { getCollectionBySlug, getCollectionPaths } from '@wsvvrijheid/utils'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { Layout } from '../../../components/Layout'
import i18nConfig from '../../../next-i18next.config'

const CollectionPage = ({
  seo,
  collection,
}: {
  seo: NextSeoProps
  collection: Collection
}) => {
  const pageShow = useBreakpointValue({ base: 1, lg: 2 })
  const centerRef = useRef(null)
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)
  const [isLoading, setIsloading] = useState(true)

  useEffect(() => {
    if (centerRef.current && pageShow) {
      setTimeout(() => {
        setHeight(centerRef.current.offsetHeight - 60)
        setWidth(centerRef.current.offsetWidth)
        setIsloading(false)
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

export const getStaticPaths = async context => {
  const paths = await getCollectionPaths(context.locales)

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps = async context => {
  const locale = context.locale

  const slug = context.params?.slug

  const collection = await getCollectionBySlug(locale, slug)

  if (!collection) return { notFound: true }

  const slugs =
    collection.localizations?.reduce((acc, l) => {
      acc[l.locale] = l.slug
      return acc
    }, {}) || {}

  const title = collection.title || null

  const seo = {
    title,
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
      seo,
      slugs: { ...slugs, [locale]: slug },
      collection,
    },
  }
}
