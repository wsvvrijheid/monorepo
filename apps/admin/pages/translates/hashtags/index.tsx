import { useState } from 'react'

import { useSearchModel } from '@wsvvrijheid/services'
import { Hashtag, Sort, StrapiLocale } from '@wsvvrijheid/types'
import {
  AdminLayout,
  DataTable,
  mainHashtagColumns,
  PageHeader,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'
import { useUpdateEffect } from 'react-use'

const MainHashtagsTranslatePage = () => {
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
    statuses: ['pending'],
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
    router.push(`/translates/hashtags/${id}`)
  }

  return (
    <AdminLayout title="Main Hashtag">
      <PageHeader
        onSearch={handleSearch}
        searchPlaceHolder={'Search by title or description'}
      ></PageHeader>

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

export default MainHashtagsTranslatePage
