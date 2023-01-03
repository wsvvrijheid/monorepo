import { Box } from '@chakra-ui/react'
import { useHashtagById } from '@wsvvrijheid/services'
import { Hashtag } from '@wsvvrijheid/types'
import {
  AdminLayout,
  mainHashtagFields,
  mainHashtagSchema,
  ModelEditForm,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'

const MainHashtagPage = () => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)
  const { data: hashtag, isLoading, refetch } = useHashtagById(id)

  return (
    <AdminLayout title="Hashtag" isLoading={isLoading} hasBackButton>
      <Box p={6} rounded="md" bg="white" shadow="md">
        {hashtag && (
          <ModelEditForm<Hashtag>
            url="api/hashtags"
            model={hashtag}
            schema={mainHashtagSchema}
            translatedFields={['title', 'description', 'content']}
            fields={mainHashtagFields}
            onSuccess={refetch}
          />
        )}
      </Box>
    </AdminLayout>
  )
}

export default MainHashtagPage
