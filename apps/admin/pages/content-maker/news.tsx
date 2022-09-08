import { Box } from '@chakra-ui/react'
import { useAuth, AdminLayout } from '@wsvvrijheid/ui'

const NewsPage = () => {
  const { user, isLoading } = useAuth()

  return (
    <AdminLayout title="News" user={user} isLoading={isLoading}>
      <Box>News</Box>
    </AdminLayout>
  )
}

export default NewsPage
