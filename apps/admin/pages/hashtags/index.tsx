import { FC, useState } from 'react'

import { useSearchModel } from '@wsvvrijheid/services'
import { Hashtag, Sort, StrapiLocale } from '@wsvvrijheid/types'
import {
  AdminLayout,
  DataTable,
  mainHashtagColumns,
  PageHeader,
} from '@wsvvrijheid/ui'
import { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { useUpdateEffect } from 'react-use'

import i18nConfig from '../../next-i18next.config'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const MainHashtagsPage: FC<PageProps> = ({ seo }) => {
  const [sort, setSort] = useState<Sort>()
  const [currentPage, setCurrentPage] = useState<number>()
  const [searchTerm, setSearchTerm] = useState<string>()
  const router = useRouter()

  const hashtagsQuery = useSearchModel<Hashtag>({
    url: 'api/hashtags',
    sort,
    searchTerm,
    searchFields: ['title', 'description'],
    page: currentPage || 1,
    locale: router.locale as StrapiLocale,
    statuses: ['approved'],
  })

  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useUpdateEffect(() => {
    hashtagsQuery.refetch()
  }, [router.locale, searchTerm, sort])

  const hashtags = hashtagsQuery?.data?.data

  const totalCount = hashtagsQuery?.data?.meta?.pagination?.pageCount
  const hashtagWithLocalizeKeys = hashtags?.map(hashtag => ({
    ...hashtag,
    translates: hashtag.localizations?.map(l => l.locale),
  }))

  const handleRowClick = (index: number, id: number) => {
    router.push(`/hashtags/${id}`)
  }

  return (
    <AdminLayout seo={seo}>
      <PageHeader onSearch={handleSearch} />

      <DataTable
        columns={mainHashtagColumns}
        data={hashtagWithLocalizeKeys}
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
    en: 'Hashtags',
    tr: 'Hashtagler',
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

export default MainHashtagsPage
