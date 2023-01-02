import { useEffect, useState } from 'react'

import { MenuItem } from '@chakra-ui/react'
import { useSearchModel } from '@wsvvrijheid/services'
import { ApprovalStatus, Art, Sort, StrapiLocale } from '@wsvvrijheid/types'
import { AdminLayout, ArtsTable } from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { useUpdateEffect } from 'react-use'

const ArtsPage = () => {
  const { query } = useRouter()
  const [currentPage, setCurrentPage] = useState<number>()
  const [searchTerm, setSearchTerm] = useState<string>()

  // Client side query params (?status=pending)
  const status = query.status as ApprovalStatus
  const defaultLocale: StrapiLocale = 'en'

  const [sort, setSort] = useState<Sort>()

  const { locale } = useRouter()

  const artsQuery = useSearchModel<Art>({
    url: 'api/arts',
    populate: [
      'artist.user.avatar',
      'categories',
      'image',
      'likers',
      'localizations',
    ],
    page: currentPage || 1,
    pageSize: 10,
    searchTerm,
    sort,
    locale: locale as StrapiLocale,
    statuses: [status],
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

  const mappedArts = arts?.map(art => ({
    ...art,
    translates: art.localizations?.map(l => l.locale),
  }))

  return (
    <AdminLayout
      title={`${status} Arts`}
      headerProps={{
        onSearch: handleSearch,
        searchPlaceHolder: 'Search arts by title or artist',
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
        data={mappedArts}
        onSuccess={artsQuery.refetch}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
      />
    </AdminLayout>
  )
}

export default ArtsPage
