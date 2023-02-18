import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { usePost } from '@wsvvrijheid/services'
import { Post } from '@wsvvrijheid/types'
import { AdminLayout, FormFields, Navigate, PageHeader } from '@wsvvrijheid/ui'
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
  const { query, locale } = router

  const id = Number(query.id as string)
  const { data: post, isLoading } = usePost(id) //refetch
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
  //post?.localizations?.filter(localdata => localdata.id)

  console.log(
    'originaldata in translates pages XXXXXXXXX',
    originalData?.id,
    'locale',
    locale,
  )

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
            <Text>original</Text>
            <Text>{originalData?.id}</Text>
            <Text>{originalData?.locale}</Text>
            <Text>{originalData?.title}</Text>
            <Text>{originalData?.description}</Text>
          </VStack>
          {post?.locale !== originalData?.locale && (
            <VStack>
              <Text>Translate</Text>
              <Text>{post?.id}</Text>
              <Text>{post?.locale}</Text>
              <Text>{post?.title}</Text>
              <Text>{post?.description}</Text>
            </VStack>
          )}
        </HStack>
      </Box>
    </AdminLayout>
  )
}

export default TranslatePage
