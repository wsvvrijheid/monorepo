import { Box } from '@chakra-ui/react'
import { useActivityById } from '@wsvvrijheid/services'
import { Activity, ActivityUpdateInput } from '@wsvvrijheid/types'
import { AdminLayout, ModelEditForm } from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'
import * as yup from 'yup'

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  content: yup.string().required('Content is required'),
  date: yup.date().required('Date is required'),
  image: yup.mixed(),
})

const ActivityPage = () => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)
  const { data: activity, isLoading, refetch } = useActivityById(id)

  return (
    <AdminLayout title="Activity" isLoading={isLoading} hasBackButton>
      <Box p={6} rounded="md" bg="white" shadow="md">
        {activity && (
          <ModelEditForm<Activity, ActivityUpdateInput>
            url="api/activities"
            model={activity}
            schema={schema}
            translatedFields={['title', 'description', 'content']}
            fields={[
              {
                name: 'title',
                isRequired: true,
              },
              {
                name: 'description',
                isRequired: true,
                type: 'textarea',
              },
              {
                name: 'content',
                isRequired: true,
                type: 'textarea',
              },
              {
                name: 'date',
                isRequired: true,
                type: 'datetime-local',
              },
              {
                name: 'image',
                type: 'file',
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

export default ActivityPage
