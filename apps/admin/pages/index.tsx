
import { Box } from '@chakra-ui/react'
import { useAuth, AdminLayout } from '@wsvvrijheid/ui'

const Index = () => {
  const { user, isLoading } = useAuth()

  return (
    <AdminLayout title="Dashboard" user={user} isLoading={!user || isLoading}>
      <Box>Dashboard</Box>
    </AdminLayout>
  )
}

export default Index
