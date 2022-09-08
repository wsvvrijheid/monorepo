import { Box } from '@chakra-ui/react'
import { useAuth, AdminLayout } from '@wsvvrijheid/ui'

const CompetitionsPage = () => {
  const { user, isLoading } = useAuth()

  return (
    <AdminLayout title="Competitions" user={user} isLoading={isLoading}>
      <Box>Competitions</Box>
    </AdminLayout>
  )
}

export default CompetitionsPage
