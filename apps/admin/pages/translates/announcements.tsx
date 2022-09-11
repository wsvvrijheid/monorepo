import { Box } from '@chakra-ui/react'
import { useAuth, AdminLayout } from '@wsvvrijheid/ui'

const AnnouncementsTranslatePage = () => {
  const { user, isLoading } = useAuth()

  return (
    <AdminLayout
      title="AnnouncementsTranslatePage"
      user={user}
      isLoading={!user || isLoading}
    >
      <Box>AnnouncementsTranslatePage</Box>
    </AdminLayout>
  )
}

export default AnnouncementsTranslatePage
