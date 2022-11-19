import { Box } from '@chakra-ui/react'
import { AdminLayout, CreateHashtagPostModal } from '@wsvvrijheid/ui'

const HashtagPostsPage = () => {
  return (
    <AdminLayout title="HashtagPosts">
      <Box>
        HashtagPosts
        <CreateHashtagPostModal />
      </Box>
    </AdminLayout>
  )
}

export default HashtagPostsPage
