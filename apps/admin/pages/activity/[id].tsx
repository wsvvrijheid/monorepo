import { Box, Button, Stack } from '@chakra-ui/react'
import { useActivityById } from '@wsvvrijheid/services'
import { ActivityEdit, AdminLayout } from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'
import { BiArrowBack } from 'react-icons/bi'

const ActivityPage = () => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)
  const { data: activity, isLoading } = useActivityById(id)

  return (
    <AdminLayout title="Activity" isLoading={isLoading}>
      <Button
        leftIcon={<BiArrowBack />}
        mb={6}
        size="sm"
        onClick={() => router.back()}
      >
        Go Back
      </Button>
      <Stack spacing={6}>
        <Box p={6} rounded="md" bg="white" shadow="md">
          {activity && <ActivityEdit activity={activity} />}
        </Box>
      </Stack>
    </AdminLayout>
  )
}

export default ActivityPage
