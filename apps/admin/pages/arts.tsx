import { FC } from 'react'

import { Box, MenuItem } from '@chakra-ui/react'
import { Art } from '@wsvvrijheid/types'
import { useAuth, AdminLayout } from '@wsvvrijheid/ui'
import { GetServerSideProps } from 'next'
import { FaArrowDown, FaArrowUp, FaUserAlt } from 'react-icons/fa'

type ArtsPageProps = {
  status: Art['status']
}

const ArtsPage: FC<ArtsPageProps> = ({ status }) => {
  const { user, isLoading } = useAuth()

  const handleSearch = (search: string) => {
    console.log(search)
  }

  return (
    <AdminLayout
      title={`${status} Arts`}
      user={user}
      isLoading={!user || isLoading}
      headerProps={{
        onSearch: handleSearch,
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
