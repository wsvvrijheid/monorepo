import { Box } from '@chakra-ui/react'
import { useAuth, AdminLayout } from '@wsvvrijheid/ui'

const BlogTranslatePage = () => {
  const { user, isLoading } = useAuth()

  return (
    <AdminLayout title="BlogTranslatePage" user={user} isLoading={isLoading}>
      <Box>BlogTranslatePage</Box>
    </AdminLayout>
  )
}

export default BlogTranslatePage
