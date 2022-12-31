import { Box } from '@chakra-ui/react'
import { useHashtagById } from '@wsvvrijheid/services'
import { Hashtag } from '@wsvvrijheid/types'
import { AdminLayout, ModelEdit } from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'
import * as yup from 'yup'

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  content: yup.string().required('Content is required'),
  date: yup.date().required('Date is required'),
  hashtag: yup.string().required('Hashtag is required'),
  hashtagExtra: yup.string(),
  mentions: yup.array().of(
    yup.object().shape({
      label: yup.string(),
      value: yup.string(),
    }),
  ),
  image: yup.mixed(),
})

const MainHashtagPage = () => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)
  const { data: hashtag, isLoading } = useHashtagById(id)

  return (
    <AdminLayout title="Hashtag" isLoading={isLoading} hasBackButton>
      <Box p={6} rounded="md" bg="white" shadow="md">
        {hashtag && (
          <ModelEdit<Hashtag>
            url="api/hashtags"
            model={hashtag}
            schema={schema}
            translatedFields={['title', 'description', 'content']}
            fields={[
              'title',
              'description',
              'content',
              'date',
              'image',
              'mentions',
              'hashtagDefault',
              'hashtagExtra',
            ]}
            queryKey={['hashtag', hashtag.id]}
          />
        )}
      </Box>
    </AdminLayout>
  )
}

export default MainHashtagPage
