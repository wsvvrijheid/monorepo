import { useState } from 'react'

import { Box, MenuItem, useDisclosure } from '@chakra-ui/react'
import { StrapiLocale } from '@wsvvrijheid/types'
import {
  useAuth,
  AdminLayout,
  ArtList,
  Pagination,
  ArtApprovalModal,
  Container,
} from '@wsvvrijheid/ui'
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
  const [selectedIndex, setSelectedIndex] = useState<number>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sort, setSort] = useState<['title:asc'] | ['title:desc']>([
    'title:asc',
  ])

  // TODO: Add status filter

  const queryKey = ['arts', locale, searchTerm, sort, currentPage || 1]

  // Custom useQuery hook or fetching arts
  const artsQuery = useArts(queryKey, {
    populate: ['artist.user.avatar', 'categories', 'images', 'likers'],
    page: currentPage || 1,
    pageSize: 10,
    searchTerm,
    sort,
    locale: locale as StrapiLocale,
  })

  const artPage = {
    totalCount: artsQuery?.data?.meta?.pagination?.pageCount,
  }
  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useUpdateEffect(() => {
    artsQuery.refetch()
  }, [locale, searchTerm, sort, status])

  //arts table -----------------------------------------
  const handleClick = (index: number) => {
    setSelectedIndex(index)
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
  const arts = artsQuery.data?.data?.filter(
    art => art.approvalStatus === status,
  )
  const selectedArt = !isNaN(selectedIndex) ? arts?.[selectedIndex] : null
  const onSave = (data: string) => {
    alert(`${data} saved`)
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
      <Container>
        <ArtList arts={arts} handleClick={handleClick} user={user} />
        {selectedArt && user && (
          <ArtApprovalModal
            artId={selectedArt.id}
            artTitle={selectedArt.title}
            artDescription={selectedArt.description}
            artImages={selectedArt.images}
            editorId={user.id as number}
            editorAvatar={user.avatar as string}
            editorName={user.username as string}
            isOpen={isOpen}
            onApprove={handleApprove}
            onDelete={handleDelete}
            onReject={handleReject}
            onClose={onClose}
            artistName={selectedArt.artist.username}
            artistAvatar={selectedArt.artist?.avatar?.url}
            onSave={onSave}
          />
        )}
        <Pagination
          totalCount={artPage.totalCount}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </Container>
    </AdminLayout>
  )
}

export default ArtsPage
