import { Box } from '@chakra-ui/react'
import { useModelById } from '@wsvvrijheid/services'
import { Activity } from '@wsvvrijheid/types'
import {
  activityFields,
  activitySchema,
  AdminLayout,
  FormLocaleSwitcher,
  ModelEditForm,
  PageHeader,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'

const ActivityPage = () => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)
  const {
    data: activity,
    isLoading,
    refetch,
  } = useModelById<Activity>({
    url: 'api/activities',
    id,
  })

  return (
    <AdminLayout title="Activity" isLoading={isLoading} hasBackButton>
      <PageHeader>
        <FormLocaleSwitcher
          models={activity?.localizations}
          slug={'activities'}
        />
      </PageHeader>
      <Box p={6} rounded="md" bg="white" shadow="md">
        {activity && (
          <ModelEditForm<Activity>
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
