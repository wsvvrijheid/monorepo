import { Box } from '@chakra-ui/react'
import { usePost } from '@wsvvrijheid/services'
import { Post, PostUpdateInput } from '@wsvvrijheid/types'
import { AdminLayout, ModelEditForm } from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'
import * as yup from 'yup'

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  content: yup.string(),
  hashtag: yup.object().shape({
    label: yup.string(),
    value: yup.string(),
  }),
  image: yup.mixed(),
  reference: yup.string(),
})

const PostPage = () => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)
  const { data: post, isLoading, refetch } = usePost(id)

  return (
    <AdminLayout title="Post" isLoading={isLoading} hasBackButton>
      <Box p={6} rounded="md" bg="white" shadow="md">
        {post && (
          <ModelEditForm<Post, PostUpdateInput>
            url="api/posts"
            model={post}
            schema={schema}
            translatedFields={['title', 'description', 'content']}
            fields={[
              { name: 'title', isRequired: true },
              { name: 'description', isRequired: true, type: 'textarea' },
              { name: 'reference' },
              { name: 'content', type: 'textarea' },
              {
                name: 'hashtag',
                type: 'select',
                url: 'api/hashtags',
                isRequired: true,
              },
              { name: 'image', type: 'file', isRequired: true },
            ]}
            onSuccess={refetch}
          />
        )}
      </Box>
    </AdminLayout>
  )
}

export default PostPage
