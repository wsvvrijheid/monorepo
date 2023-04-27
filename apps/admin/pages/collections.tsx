import { useEffect, useState } from 'react'

import { useDisclosure, useUpdateEffect } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { useSearchModel } from '@wsvvrijheid/services'
import { Collection, Sort, StrapiLocale } from '@wsvvrijheid/types'
import {
  AdminLayout,
  DataTable,
  collectionColumns,
  collectionFields,
  collectionSchema,
  ModelEditModal,
  PageHeader,
} from '@wsvvrijheid/ui'

import i18nConfig from '../next-i18next.config'

const CollectionsPage = ({ seo }) => {
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState<number>()
  const [selectedId, setSelectedId] = useState<number>()
  const { isOpen, onClose, onOpen } = useDisclosure()

  const [searchTerm, setSearchTerm] = useState<string>()
  const { locale } = useRouter()

  const [sort, setSort] = useState<Sort>()

  const collectionsQuery = useSearchModel<Collection>({
    url: 'api/collections',
    page: currentPage || 1,
    pageSize: 10,
    searchTerm,
    sort,
    locale: locale as StrapiLocale,
    statuses: ['approved'],
    publicationState: 'preview',
  })

  useEffect(() => setCurrentPage(1), [])
  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useUpdateEffect(() => {
    collectionsQuery.refetch()
  }, [locale, searchTerm, sort])

  const collections = collectionsQuery?.data?.data
  const totalCount = collectionsQuery?.data?.meta?.pagination?.pageCount

  const mappedCollections = collections?.map(collection => ({
    ...collection,
    translates: collection.localizations?.map(l => l.locale),
  }))

  const handleClick = (index: number, id: number) => {
    setSelectedId(id)
  }

  const handleClose = () => {
    setSelectedId(undefined)
    onClose()
  }

  useEffect(() => {
    if (selectedId) {
      onOpen()
    }
  }, [selectedId])

  return (
    <AdminLayout seo={seo}>
      <PageHeader
        onSearch={handleSearch}
        searchPlaceHolder={t('search-placeholder')}
      />
      <ModelEditModal<Collection>
        url={'api/collections'}
        id={selectedId}
        isOpen={isOpen}
        onClose={handleClose}
        fields={collectionFields}
        schema={collectionSchema}
        title={'Edit Collection'}
      />
      <DataTable
        columns={collectionColumns}
        data={mappedCollections}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
        onClickRow={handleClick}
      />
    </AdminLayout>
  )
}

export const getStaticProps = async context => {
  const { locale } = context

  const title = {
    en: 'Collections',
    tr: 'Collectionlar',
    nl: 'Collections',
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