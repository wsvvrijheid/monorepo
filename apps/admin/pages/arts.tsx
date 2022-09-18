import { useState } from 'react'

import { Box, Code, MenuItem } from '@chakra-ui/react'
import { ApprovalStatus, StrapiLocale } from '@wsvvrijheid/types'
import { useAuth, AdminLayout } from '@wsvvrijheid/ui'
import { useArts } from '@wsvvrijheid/utils'
import { useRouter } from 'next/router'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { useUpdateEffect } from 'react-use'

const ArtsPage = () => {
  const { user, isLoading } = useAuth()
  const { query } = useRouter()

  // Client side query params (?status=pending)
  const status = query.status as ApprovalStatus
  const defaultLocale: StrapiLocale = 'en'

  const [searchTerm, setSearchTerm] = useState<string>()
  const [locale, setLocale] = useState<StrapiLocale>(defaultLocale)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sort, setSort] = useState<['title:asc'] | ['title:desc']>([
    'title:asc',
  ])

  // TODO: Add status filter
  const artsQuery = useArts(['arts'], {
    searchTerm,
    locale,
    sort,
    status,
  })

  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useUpdateEffect(() => {
    artsQuery.refetch()
  }, [locale, searchTerm, sort, status])

  console.log('artsQuery', artsQuery.data?.data)

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
      <Code>
        <pre>
          {JSON.stringify(
            artsQuery.data?.data?.map(art => art.title),
            null,
            2,
          )}
        </pre>
      </Code>
    </AdminLayout>
  )
}

export default ArtsPage
