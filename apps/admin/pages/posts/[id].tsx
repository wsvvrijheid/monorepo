import { Box } from '@chakra-ui/react'
import { usePost } from '@wsvvrijheid/services'
import { Post } from '@wsvvrijheid/types'
import { AdminLayout, ModelEdit } from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'
import * as yup from 'yup'

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  content: yup.string().required('Content is required'),
  hashtag: yup.object().shape({
    label: yup.string(),
    value: yup.string(),
  }),
  image: yup.object().shape({
    file: yup.mixed(),
  }),
  reference: yup.string(),
})

const PostPage = () => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)
  const { data: post, isLoading } = usePost(id)

  console.log('post', post)

  return (
    <AdminLayout title="Post" isLoading={isLoading} hasBackButton>
      <Box p={6} rounded="md" bg="white" shadow="md">
        {post && (
          <ModelEdit<Post>
            url="api/posts"
            model={post}
            schema={schema}
            translatedFields={['title', 'description', 'content']}
            fields={[
              'title',
              'description',
              'content',
              'image',
              'hashtag',
              'reference',
            ]}
            queryKey={['hashtag', post.id]}
          />
        )}
      </Box>
    </AdminLayout>
  )
}

export default PostPage
