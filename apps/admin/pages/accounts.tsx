import { Box } from '@chakra-ui/react'
import { useAuth, AdminLayout } from '@wsvvrijheid/ui'

const AccountsPage = () => {
  const { user, isLoading } = useAuth()

  return (
    <AdminLayout title="Accounts" user={user} isLoading={!user || isLoading}>
      <Box>Accounts</Box>
    </AdminLayout>
  )
}

export default AccountsPage
