import { Box, Button, ButtonGroup } from '@chakra-ui/react'
import { useModelById } from '@wsvvrijheid/services'
import { Hashtag } from '@wsvvrijheid/types'
import {
  AdminLayout,
  mainHashtagFields,
  mainHashtagSchema,
  ModelEditForm,
  Navigate,
  PageHeader,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'

const MainHashtagPage = () => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)
  const {
    data: hashtag,
    isLoading,
    refetch,
  } = useModelById<Hashtag>({
    url: 'api/hashtags',
    id,
  })

  return (
    <AdminLayout title="Hashtag" isLoading={isLoading} hasBackButton>
      <PageHeader>
        <ButtonGroup>
          {hashtag?.localizations?.map(l => (
            <Navigate key={l.id} href={`/hashtags/${l.id}`}>
              <Button textTransform={'uppercase'}>{l.locale}</Button>
            </Navigate>
          ))}
        </ButtonGroup>
      </PageHeader>
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
