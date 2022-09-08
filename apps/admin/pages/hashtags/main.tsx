import { Box } from '@chakra-ui/react'
import { useAuth, AdminLayout } from '@wsvvrijheid/ui'

const MainHashtagPage = () => {
  const { user, isLoading } = useAuth()

  return (
    <AdminLayout title="MainHashtag" user={user} isLoading={!user || isLoading}>
      <Box>MainHashtag</Box>
    </AdminLayout>
  )
}

export default MainHashtagPage
