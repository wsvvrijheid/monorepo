import { Box, Button, ButtonGroup } from '@chakra-ui/react'
import { useModelById } from '@wsvvrijheid/services'
import { Post } from '@wsvvrijheid/types'
import {
  AdminLayout,
  ModelEditForm,
  Navigate,
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
      <PageHeader>
        <ButtonGroup>
          {post?.localizations?.map(l => (
            <Navigate key={l.id} href={`/posts/${l.id}`}>
              <Button textTransform={'uppercase'}>{l.locale}</Button>
            </Navigate>
          ))}
        </ButtonGroup>
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
