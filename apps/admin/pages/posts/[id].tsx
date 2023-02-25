import { Box } from '@chakra-ui/react'
import { useModelById } from '@wsvvrijheid/services'
import { Post } from '@wsvvrijheid/types'
import {
  AdminLayout,
  FormLocaleSwitcher,
  ModelEditForm,
  PageHeader,
  postFields,
  postSchema,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'

const PostPage = () => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)
  const {
    data: post,
    isLoading,
    refetch,
  } = useModelById<Post>({
    url: 'api/posts',
    id,
  })

  return (
    <AdminLayout title="Post" isLoading={isLoading} hasBackButton>
      <PageHeader hideLocaleSwitcher>
        <FormLocaleSwitcher models={post?.localizations} slug={'posts'} />
      </PageHeader>
      <Box p={6} rounded="md" bg="white" shadow="md">
        {post && (
          <ModelEditForm<Post>
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
