import { Box } from '@chakra-ui/react'
import { useAuth, AdminLayout } from '@wsvvrijheid/ui'

const HashtagPostsPage = () => {
  const { user, isLoading } = useAuth()

  return (
    <AdminLayout
      title="HashtagPosts"
      user={user}
      isLoading={!user || isLoading}
    >
      <Box>HashtagPosts</Box>
    </AdminLayout>
  )
}

export default HashtagPostsPage
