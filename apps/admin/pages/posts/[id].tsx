import { Box } from '@chakra-ui/react'
import { usePost } from '@wsvvrijheid/services'
import { Post } from '@wsvvrijheid/types'
import {
  AdminLayout,
  ModelEditForm,
  postFields,
  postSchema,
  PostSchemaKeys,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'

const PostPage = () => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)
  const { data: post, isLoading, refetch } = usePost(id)

  return (
    <AdminLayout title="Post" isLoading={isLoading} hasBackButton>
      <Box p={6} rounded="md" bg="white" shadow="md">
        {post && (
          <ModelEditForm<Post, PostSchemaKeys>
            url="api/posts"
            model={post}
            schema={postSchema}
            translatedFields={['title', 'description', 'content']}
            fields={postFields}
            onSuccess={refetch}
          />
        )}
      </Box>
    </AdminLayout>
  )
}

export default PostPage
