import { FC, useEffect, useState } from 'react'

import { useDisclosure, useUpdateEffect } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { useSearchModel } from '@wsvvrijheid/services'
import { Hashtag, Sort, StrapiLocale } from '@wsvvrijheid/types'
import {
  AdminLayout,
  DataTable,
  ModelEditModal,
  PageHeader,
  mainHashtagColumns,
  mainHashtagFields,
  mainHashtagSchema,
} from '@wsvvrijheid/ui'

import i18nConfig from '../next-i18next.config'

type HashtagsPageProps = InferGetStaticPropsType<typeof getStaticProps>

const HashtagsPage: FC<HashtagsPageProps> = ({ seo }) => {
  const { t } = useTranslation()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedId, setSelectedId] = useState<number>()
  const { isOpen, onClose, onOpen } = useDisclosure()

  const [searchTerm, setSearchTerm] = useState<string>()
  const { locale } = useRouter()

  const [sort, setSort] = useState<Sort>()

  const hashtagsQuery = useSearchModel<Hashtag>({
    url: 'api/hashtags',
    page: currentPage || 1,
    pageSize: 10,
    searchTerm,
    sort,
    locale: locale as StrapiLocale,
    statuses: ['approved', 'pending', 'rejected'],
    publicationState: 'preview',
  })

  useEffect(() => setCurrentPage(1), [])
  const handleSearch = (search?: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useUpdateEffect(() => {
    hashtagsQuery.refetch()
  }, [locale, searchTerm, sort])

  const hashtags = hashtagsQuery?.data?.data
  const totalCount = hashtagsQuery?.data?.meta?.pagination?.pageCount || 0

  const mappedHashtags =
    hashtags?.map(hashtag => ({
      ...hashtag,
      translates: hashtag.localizations?.map(l => l.locale),
    })) || []

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

      {selectedId && (
        <ModelEditModal<Hashtag>
          url={'api/hashtags'}
          id={selectedId}
          isOpen={isOpen}
          onClose={handleClose}
          fields={mainHashtagFields}
          schema={mainHashtagSchema}
          title={'Edit Hashtag'}
        />
      )}
      <DataTable
        columns={mainHashtagColumns}
        data={mappedHashtags}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
        onClickRow={handleClick}
      />
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const title = {
    en: 'Hashtags',
    tr: 'Hashtaglar',
    nl: 'Hashtags',
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

export default HashtagsPage
