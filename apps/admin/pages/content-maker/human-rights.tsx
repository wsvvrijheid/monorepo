import { Box } from '@chakra-ui/react'
import { useAuth, AdminLayout } from '@wsvvrijheid/ui'

const HumanRightsPage = () => {
  const { user, isLoading } = useAuth()

  return (
    <AdminLayout title="HumanRights" user={user} isLoading={isLoading}>
      <Box>HumanRights</Box>
    </AdminLayout>
  )
}

export default HumanRightsPage
