import { Box } from '@chakra-ui/react'
import { useAuth, AdminLayout } from '@wsvvrijheid/ui'

const BlogsTranslatePage = () => {
  const { user, isLoading } = useAuth()

  return (
    <AdminLayout
      title="BlogsTranslatePage"
      user={user}
      isLoading={!user || isLoading}
    >
      <Box>BlogTranslatePage</Box>
    </AdminLayout>
  )
}

export default BlogsTranslatePage
