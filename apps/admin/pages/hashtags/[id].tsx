import { Box } from '@chakra-ui/react'
import { useHashtagById } from '@wsvvrijheid/services'
import { Hashtag, HashtagUpdateInput } from '@wsvvrijheid/types'
import { AdminLayout, ModelEditForm } from '@wsvvrijheid/ui'
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
  const { data: hashtag, isLoading, refetch } = useHashtagById(id)

  return (
    <AdminLayout title="Hashtag" isLoading={isLoading} hasBackButton>
      <Box p={6} rounded="md" bg="white" shadow="md">
        {hashtag && (
          <ModelEditForm<Hashtag, HashtagUpdateInput>
            url="api/hashtags"
            model={hashtag}
            schema={schema}
            translatedFields={['title', 'description', 'content']}
            fields={[
              { name: 'title', isRequired: true },
              { name: 'description', isRequired: true, type: 'textarea' },
              { name: 'content', isRequired: true, type: 'textarea' },
              { name: 'date', isRequired: true, type: 'datetime-local' },
              { name: 'image', isRequired: true, type: 'file' },
              { name: 'hashtagDefault', isRequired: true },
              { name: 'hashtagExtra' },
              {
                name: 'mentions',
                type: 'select',
                url: 'api/mentions',
                isMulti: true,
                isRequired: true,
              },
            ]}
            onSuccess={refetch}
          />
        )}
      </Box>
    </AdminLayout>
  )
}

export default MainHashtagPage
