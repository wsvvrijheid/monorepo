import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { usePost } from '@wsvvrijheid/services'
import { Post } from '@wsvvrijheid/types'
import {
  AdminLayout,
  FormFields,
  ModelEditTranslate,
  Navigate,
  PageHeader,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'
import * as yup from 'yup'

export const translatePostSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  content: yup.string(),
})

export const translatedField: FormFields<Post> = [
  { name: 'title', isRequired: true },

  { name: 'description', isRequired: true, type: 'textarea' },

  { name: 'content', type: 'markdown' },
]

const TranslatePage = () => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)
  const { data: post, isLoading, refetch } = usePost(id) //
  let original = post //41
  const findOriginal = post => {
    post?.localizations?.map(localpost => {
      if (localpost.id < post?.id) {
        original = localpost
        console.log('original in if', original?.id)
      } else original = post
    })
    return original
  }

  const originalData = findOriginal(post)

  return (
    <AdminLayout title="Post" isLoading={isLoading} hasBackButton>
      <PageHeader>
        <ButtonGroup>
          {post?.localizations?.map(l => (
            <Navigate key={l.id} href={`/translates/posts/${l.id}`}>
              {l?.locale !== originalData?.locale && (
                <Button textTransform={'uppercase'}>{l.locale}</Button>
              )}
            </Navigate>
          ))}
        </ButtonGroup>
      </PageHeader>
      <Box p={6} rounded="md" bg="white" shadow="md">
        <HStack>
          <VStack>
            <Text size="lg" fontWeight={'bold'}>
              Title
            </Text>
            <Text>{originalData?.title}</Text>
            <Stack>
              <Text size="lg" fontWeight={'bold'}>
                Description
              </Text>
              <Text>{originalData?.description}</Text>
              <Text size="lg" fontWeight={'bold'}>
                Content
              </Text>
              <Text>{originalData?.content}</Text>
            </Stack>
          </VStack>
          {post?.locale !== originalData?.locale && (
            <VStack>
              <Box p={6} rounded="md" bg="white" shadow="md">
                {post && (
                  <ModelEditTranslate<Post>
                    url="api/posts"
                    model={post}
                    schema={translatePostSchema}
                    translatedFields={['title', 'description', 'content']}
                    fields={translatedField}
                    onSuccess={refetch}
                  />
                )}
              </Box>
              {/* <Text>Translate</Text>
              <Text>{post?.id}</Text>
              <Text>{post?.locale}</Text>
              <Text size="lg" fontWeight={'bold'}>
                Title
              </Text>
              <Text>{post?.title}</Text>
              <Text size="lg" fontWeight={'bold'}>
                Description
              </Text>
              <Text>{post?.description}</Text>
              <Text size="lg" fontWeight={'bold'}>
                Content
              </Text>
              <Text>{post?.content}</Text>*/}
            </VStack>
          )}
        </HStack>
      </Box>
    </AdminLayout>
  )
}

export default TranslatePage
