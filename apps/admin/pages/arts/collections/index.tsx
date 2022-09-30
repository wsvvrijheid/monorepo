import { useState } from 'react'

import { MenuItem } from '@chakra-ui/react'
import { StrapiLocale, Sort } from '@wsvvrijheid/types'
import { useAuth, AdminLayout, CollectionsTable } from '@wsvvrijheid/ui'
import { useCollectionsByFilterAndSort } from '@wsvvrijheid/utils'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { useUpdateEffect } from 'react-use'

const CollectionsPage = () => {
  const { user, isLoading } = useAuth()
  const [currentPage, setCurrentPage] = useState<number>()
  // Client side query params (?status=pending)
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
      user={user}
      isLoading={!user || isLoading}
      headerProps={{
        onSearch: handleSearch,
        onLanguageSwitch: locale => setLocale(locale),
        defaultLocale,
        sortMenu: [
          <MenuItem key="asc" icon={<FaArrowUp />}>
            Name Asc
          </MenuItem>,
          <MenuItem key="desc" icon={<FaArrowDown />}>
            Name Desc
          </MenuItem>,
        ],
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
