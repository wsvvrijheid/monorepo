import { Box } from '@chakra-ui/react'
import { useAuth, AdminLayout } from '@wsvvrijheid/ui'

const PostsTranslatePage = () => {
  const { user, isLoading } = useAuth()

  return (
    <AdminLayout title="PostsTranslatePage" user={user} isLoading={isLoading}>
      <Box>PostsTranslatePage</Box>
    </AdminLayout>
  )
}

export default PostsTranslatePage
