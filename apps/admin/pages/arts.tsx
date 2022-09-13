import { FC, useState } from 'react'

import { Box, Code, MenuItem } from '@chakra-ui/react'
import { Art, StrapiLocale } from '@wsvvrijheid/types'
import { useAuth, AdminLayout } from '@wsvvrijheid/ui'
import { useArts } from '@wsvvrijheid/utils'
import { GetServerSideProps } from 'next'
import { FaArrowDown, FaArrowUp, FaUserAlt } from 'react-icons/fa'
import { useUpdateEffect } from 'react-use'

type ArtsPageProps = {
  status: Art['translationStatus']
}

const ArtsPage: FC<ArtsPageProps> = ({ status }) => {
  const defaultLocale: StrapiLocale = 'en'
  const { user, isLoading } = useAuth()
  const [searchTerm, setSearchTerm] = useState<string>()
  const [locale, setLocale] = useState<StrapiLocale>(defaultLocale)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sort, setSort] = useState<['title:asc'] | ['title:desc']>([
    'title:asc',
  ])

  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  const artsQuery = useArts(['arts'], {
    searchTerm,
    locale,
    sort,
  })

  useUpdateEffect(() => {
    artsQuery.refetch()
  }, [locale, searchTerm, sort])

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
        filterMenu: [
          <MenuItem
            icon={<FaUserAlt />}
            key="user"
            onClick={() => alert('Artist')}
          >
            Artist
          </MenuItem>,
        ],
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

export const getServerSideProps: GetServerSideProps = async context => {
  const status = context.query?.status as string

  return {
    props: {
      status,
    },
  }
}

export default ArtsPage
