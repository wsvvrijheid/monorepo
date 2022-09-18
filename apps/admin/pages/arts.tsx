import { useState } from 'react'

import { Box, MenuItem } from '@chakra-ui/react'
import { ApprovalStatus, StrapiLocale } from '@wsvvrijheid/types'
import { useAuth, AdminLayout, ArtList } from '@wsvvrijheid/ui'
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sort, setSort] = useState<['title:asc'] | ['title:desc']>([
    'title:asc',
  ])
  const queryKey = ['arts', locale, searchTerm, sort, currentPage || 1]
  // TODO: Add status filter
  const artsQuery = useArts(queryKey, {
    populate: ['artist.user.avatar', 'categories', 'images', 'likers'],
    page: currentPage || 1,
    pageSize: 10,
    searchTerm,
    sort,
    locale: locale as StrapiLocale,
  })

  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useUpdateEffect(() => {
    artsQuery.refetch()
  }, [locale, searchTerm, sort, status])

  const arts = artsQuery?.data?.data.filter(
    art => art.approvalStatus === status,
  )

  const artPage = {
    totalCount: artsQuery?.data?.meta?.pagination?.pageCount,
  }
  return (
    <AdminLayout
      title={`${status} Arts`}
      user={user}
      isLoading={!user || isLoading}
      headerProps={{
        onSearch: handleSearch,
        onLanguageSwitch: locale => setLocale(locale),
        defaultLocale,
        // TODO: List artists to be able to filter by artist
        // filterMenu: [
        //   <MenuItem
        //     icon={<FaUserAlt />}
        //     key="user"
        //     onClick={() => alert('Artist')}
        //   >
        //     Artist
        //   </MenuItem>,
        // ],
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
      <Box>{status} Arts</Box>
      <ArtList
        arts={arts}
        user={user}
        totalCount={artPage.totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </AdminLayout>
  )
}

export default ArtsPage
