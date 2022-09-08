import { Box } from '@chakra-ui/react'
import { useAuth, AdminLayout } from '@wsvvrijheid/ui'

const ActivitiesTranslatePage = () => {
  const { user, isLoading } = useAuth()

  return (
    <AdminLayout
      title="ActivitiesTranslatePage"
      user={user}
      isLoading={isLoading}
    >
      <Box>ActivitiesTranslatePage</Box>
    </AdminLayout>
  )
}

export default ActivitiesTranslatePage
