import { useState } from 'react'

import { useCollectionsByFilterAndSort } from '@wsvvrijheid/services'
import { StrapiLocale, Sort } from '@wsvvrijheid/types'
import { AdminLayout, CollectionsTable } from '@wsvvrijheid/ui'
import { useUpdateEffect } from 'react-use'

const CollectionsPage = () => {
  const [currentPage, setCurrentPage] = useState<number>()
  const defaultLocale: StrapiLocale = 'tr'

  const [searchTerm, setSearchTerm] = useState<string>()
  const [locale, setLocale] = useState<StrapiLocale>(undefined)

  const [sort, setSort] = useState<Sort>()
  const queryKey = ['collections', searchTerm, sort, currentPage || 1]

  const CollectionsQuery = useCollectionsByFilterAndSort(queryKey, {
    sort,
    searchTerm,
    page: currentPage || 1,
    locale: locale as StrapiLocale,
  })
  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useUpdateEffect(() => {
    CollectionsQuery.refetch()
  }, [locale, searchTerm, sort])

  const collections = CollectionsQuery?.data?.data
  const totalCount = CollectionsQuery?.data?.meta.pagination.total

  const mappedCollections = collections?.map(collection => ({
    ...collection,
    translates: collection.localizations?.map(l => l.locale),
  }))

  return (
    <AdminLayout
      title="Collections"
      headerProps={{
        onSearch: handleSearch,
        onLanguageSwitch: locale => setLocale(locale),
        defaultLocale,
      }}
    >
      <CollectionsTable
        data={mappedCollections}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
      />
    </AdminLayout>
  )
}

export default CollectionsPage
