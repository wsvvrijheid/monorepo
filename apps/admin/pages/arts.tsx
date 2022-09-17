import { useEffect, useState } from 'react'

import { Box, MenuItem, useDisclosure } from '@chakra-ui/react'
import { StrapiLocale } from '@wsvvrijheid/types'
import { useAuth, AdminLayout, ArtList, Pagination } from '@wsvvrijheid/ui'
import { useArts } from '@wsvvrijheid/utils'
import { useRouter } from 'next/router'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { useUpdateEffect } from 'react-use'

const ArtsPage = () => {
  const { user, isLoading } = useAuth()
  const { query } = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  // Client side query params (?status=pending)
  const status = query.status as string
  const defaultLocale: StrapiLocale = 'en'

  const [searchTerm, setSearchTerm] = useState<string>()
  const [locale, setLocale] = useState<StrapiLocale>(defaultLocale)
  const [currentPage, setCurrentPage] = useState<number>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sort, setSort] = useState<['title:asc'] | ['title:desc']>([
    'title:asc',
  ])

  // TODO: Add status filter
  const artsQuery = useArts(['arts'], {
    searchTerm,
    locale,
    sort,
  })
  const artPage = {
    currentPage: 1,
    totalCount: artsQuery?.data?.meta?.pagination?.pageCount,
    siblingCount: 2,
  }
  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useEffect(() => {
    setCurrentPage(artPage.currentPage)
  }, [artPage.currentPage])

  useUpdateEffect(() => {
    artsQuery.refetch()
  }, [locale, searchTerm, sort, status])

  //arts table -----------------------------------------
  const handleClick = () => {
    onOpen()
  }
  const handleReject = (artId: number, editorId: number, feedback: string) => {
    alert(feedback)

    onClose()
  }
  const handleApprove = (artId: number, editorId: number, feedback: string) => {
    alert(feedback)
    onClose()
  }
  const handleDelete = (id: number) => {
    alert(`${id} is deleted`)
    onClose()
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
      <Box>
        <ArtList
          arts={artsQuery.data?.data?.filter(
            art => art.approvalStatus === status,
          )}
          handleClick={handleClick}
          isOpen={isOpen}
          onClose={onClose}
          handleApprove={handleApprove}
          handleDelete={handleDelete}
          handleReject={handleReject}
        />

        <Pagination
          totalCount={artPage.totalCount}
          siblingCount={artPage.siblingCount}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </Box>
    </AdminLayout>
  )
}

export default ArtsPage
