import { useEffect, useState } from 'react'

import { MenuItem } from '@chakra-ui/react'
import { ApprovalStatus, StrapiLocale, Sort } from '@wsvvrijheid/types'
import { useAuth, AdminLayout, ArtsTable } from '@wsvvrijheid/ui'
import { useArts } from '@wsvvrijheid/utils'
import { useRouter } from 'next/router'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { useUpdateEffect } from 'react-use'

const ArtsPage = () => {
  const { user, isLoading } = useAuth()
  const { query } = useRouter()
  const [currentPage, setCurrentPage] = useState<number>()
  // Client side query params (?status=pending)
  const status = query.status as ApprovalStatus
  const defaultLocale: StrapiLocale = 'en'

  const [searchTerm, setSearchTerm] = useState<string>()
  const [locale, setLocale] = useState<StrapiLocale>(defaultLocale)

  const [sort, setSort] = useState<Sort>()
  const queryKey = ['arts', locale, searchTerm, sort, currentPage || 1, status]

  const artsQuery = useArts(queryKey, {
    populate: ['artist.user.avatar', 'categories', 'images', 'likers'],
    page: currentPage || 1,
    pageSize: 10,
    searchTerm,
    sort,
    locale: locale as StrapiLocale,
    status,
  })
  useEffect(() => setCurrentPage(1), [status])
  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useUpdateEffect(() => {
    artsQuery.refetch()
  }, [locale, searchTerm, sort, status])

  const arts = artsQuery?.data?.data
  const totalCount = artsQuery?.data?.meta?.pagination?.pageCount

  return (
    <AdminLayout
      title={`${status} Arts`}
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
      <ArtsTable
        queryKey={queryKey}
        data={arts}
        user={user}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
      />
    </AdminLayout>
  )
}

export default ArtsPage
