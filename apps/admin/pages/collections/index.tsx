import { FC, useState } from 'react'

import { useSearchModel } from '@wsvvrijheid/services'
import { Collection, Sort, StrapiLocale } from '@wsvvrijheid/types'
import {
  AdminLayout,
  collectionColumns,
  DataTable,
  PageHeader,
} from '@wsvvrijheid/ui'
import { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { useUpdateEffect } from 'react-use'

import i18nConfig from '../../next-i18next.config'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const CollectionsPage: FC<PageProps> = ({ seo }) => {
  const [sort, setSort] = useState<Sort>()
  const [currentPage, setCurrentPage] = useState<number>()
  const [searchTerm, setSearchTerm] = useState<string>()
  const router = useRouter()

  const collectionsQuery = useSearchModel<Collection>({
    url: 'api/collections',
    sort,
    searchTerm,
    page: currentPage || 1,
    locale: router.locale as StrapiLocale,
    statuses: ['approved'],
  })
  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useUpdateEffect(() => {
    collectionsQuery.refetch()
  }, [router.locale, searchTerm, sort])

  const collections = collectionsQuery?.data?.data
  const totalCount = collectionsQuery?.data?.meta.pagination.total

  const mappedCollections = collections?.map(collection => ({
    ...collection,
    translates: collection.localizations?.map(l => l.locale),
  }))

  const handleRowClick = (index: number, id: number) => {
    router.push(`/collections/${id}`)
  }

  return (
    <AdminLayout seo={seo}>
      <PageHeader onSearch={handleSearch} />

      <DataTable
        columns={collectionColumns}
        data={mappedCollections}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
        onClickRow={handleRowClick}
      />
    </AdminLayout>
  )
}

export const getStaticProps = async context => {
  const { locale } = context

  const title = {
    en: 'Collections',
    tr: 'Koleksiyonlar',
    nl: 'Collecties',
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

export default CollectionsPage
