import { Box } from '@chakra-ui/react'
import { useGetBlog } from '@wsvvrijheid/services'
import { Blog } from '@wsvvrijheid/types'
import {
  AdminLayout,
  blogFields,
  blogSchema,
  ModelEditForm,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'

const BlogPage = () => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)
  const { data: blogs, isLoading, refetch } = useGetBlog(id)
  //TODO: Unpublished blogs doesn't coming

  return (
    <AdminLayout title="Blogs" isLoading={isLoading} hasBackButton>
      <Box p={6} rounded="md" bg="white" shadow="md">
        {blogs && (
          <ModelEditForm<Blog>
            url="api/blogs"
            model={blogs}
            translatedFields={['title', 'description', 'content']}
            schema={blogSchema}
            fields={blogFields}
            onSuccess={refetch}
          />
        )}
      </Box>
    </AdminLayout>
  )
}

export default BlogPage
