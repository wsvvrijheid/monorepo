import { Box } from '@chakra-ui/react'
import { useActivityById } from '@wsvvrijheid/services'
import { Activity } from '@wsvvrijheid/types'
import {
  activityFields,
  activitySchema,
  ActivitySchemaKeys,
  AdminLayout,
  ModelEditForm,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'

const ActivityPage = () => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)
  const { data: activity, isLoading, refetch } = useActivityById(id)

  return (
    <AdminLayout title="Activity" isLoading={isLoading} hasBackButton>
      <Box p={6} rounded="md" bg="white" shadow="md">
        {activity && (
          <ModelEditForm<Activity, ActivitySchemaKeys>
            url="api/activities"
            model={activity}
            schema={activitySchema}
            translatedFields={['title', 'description', 'content']}
            fields={activityFields}
            onSuccess={refetch}
          />
        )}
      </Box>
    </AdminLayout>
  )
}

export default ActivityPage
