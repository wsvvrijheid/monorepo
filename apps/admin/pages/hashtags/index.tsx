import { useState } from 'react'

import { useHashtagsByFilterAndSort } from '@wsvvrijheid/services'
import { StrapiLocale, Sort } from '@wsvvrijheid/types'
import {
  AdminLayout,
  CreateMainHashtagModal,
  MainHashtagTable,
} from '@wsvvrijheid/ui'
import { useUpdateEffect } from 'react-use'
const MainHashtagPage = () => {
  const [currentPage, setCurrentPage] = useState<number>()
  const defaultLocale: StrapiLocale = 'en'

  const [searchTerm, setSearchTerm] = useState<string>()
  const [locale, setLocale] = useState<StrapiLocale>(defaultLocale)
  const [sort, setSort] = useState<Sort>()
  const queryKey = ['hashtag', searchTerm, sort, currentPage || 1]

  const HashtagsQuery = useHashtagsByFilterAndSort(queryKey, {
    sort,
    searchTerm,
    page: currentPage || 1,
    locale: locale as StrapiLocale,
  })
  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useUpdateEffect(() => {
    HashtagsQuery.refetch()
  }, [locale, searchTerm, sort])

  const hashtags = HashtagsQuery?.data?.data
  const totalCount = HashtagsQuery?.data?.meta?.pagination?.pageCount

  const mappedHashtags = hashtags?.map(hashtag => ({
    ...hashtag,
    translates: hashtag.localizations?.map(l => l.locale),
  }))
  return (
    <AdminLayout
      title="Main Hashtag"
      headerProps={{
        onSearch: handleSearch,
        onLanguageSwitch: locale => setLocale(locale),
        defaultLocale,
      }}
    >
      <CreateMainHashtagModal />
      <MainHashtagTable
        data={mappedHashtags}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
      />
    </AdminLayout>
  )
}

export default MainHashtagPage
