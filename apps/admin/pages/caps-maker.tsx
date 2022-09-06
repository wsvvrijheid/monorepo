import { Box } from '@chakra-ui/react'
import { useAuth, AdminLayout } from '@wsvvrijheid/ui'

const CapsMakerPage = () => {
  const { user, isLoading } = useAuth()

  return (
    <AdminLayout title="CapsMaker" user={user} isLoading={isLoading}>
      <Box>CapsMaker</Box>
    </AdminLayout>
  )
}

export default CapsMakerPage
