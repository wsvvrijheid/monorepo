import { Box } from '@chakra-ui/react'
import { useAuth, AdminLayout } from '@wsvvrijheid/ui'

const ArtsTranslatePage = () => {
  const { user, isLoading } = useAuth()

  return (
    <AdminLayout title="ArtsTranslatePage" user={user} isLoading={isLoading}>
      <Box>ArtsTranslatePage</Box>
    </AdminLayout>
  )
}

export default ArtsTranslatePage
