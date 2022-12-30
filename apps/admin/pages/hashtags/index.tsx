import { useState } from 'react'

import { useSearchModel } from '@wsvvrijheid/services'
import { Sort, StrapiLocale } from '@wsvvrijheid/types'
import { AdminLayout, CreateMainHashtagModal, DataTable } from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'
import { useUpdateEffect } from 'react-use'

import { mainHashtagColumns } from '../../data/'

const MainHashtagsPage = () => {
  const [sort, setSort] = useState<Sort>()
  const [currentPage, setCurrentPage] = useState<number>()
  const [searchTerm, setSearchTerm] = useState<string>()
  const router = useRouter()

  const queryKey = ['hashtag', searchTerm, sort, currentPage || 1]

  const hashtagsQuery = useSearchModel(queryKey, {
    url: 'api/hashtags',
    sort,
    searchTerm,
    searchFields: ['title', 'description'],
    page: currentPage || 1,
    locale: router.locale as StrapiLocale,
    statuses: ['approved', 'pending', 'rejected'],
  })

  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useUpdateEffect(() => {
    hashtagsQuery.refetch()
  }, [router.locale, searchTerm, sort])

  const hashtags = hashtagsQuery?.data?.data
  console.log('hashtagsQuery.data', hashtagsQuery.data)
  const totalCount = hashtagsQuery?.data?.meta?.pagination?.pageCount
  const hashtagWithLocalizeKeys = hashtags?.map(hashtag => ({
    ...hashtag,
    translates: hashtag.localizations?.map(l => l.locale),
  }))

  const handleRowClick = (index: number, id: number) => {
    router.push(`/hashtags/${id}`)
  }

  return (
    <AdminLayout
      title="Main Hashtag"
      headerProps={{
        onSearch: handleSearch,
      }}
    >
      <CreateMainHashtagModal queryKey={queryKey} />
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

export default MainHashtagsPage
