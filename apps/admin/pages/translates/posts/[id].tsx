import { Button, ButtonGroup } from '@chakra-ui/react'
import { usePost } from '@wsvvrijheid/services'
import { Post } from '@wsvvrijheid/types'
import {
  AdminLayout,
  ModelEditTranslate,
  Navigate,
  PageHeader,
  translatePostField,
  translatePostSchema,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'

const TranslatePostPage = () => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)
  const { data: post, isLoading, refetch } = usePost(id)
  let original = post

  const findOriginal = post => {
    post?.localizations?.map(localpost => {
      if (localpost.id < post?.id) {
        original = localpost
      } else original = post
    })
    return original
  }

  const originalData = findOriginal(post) as Post

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
      <ModelEditTranslate
        url="api/posts"
        targetModel={post}
        currentModel={originalData as Post}
        translatedFields={['title', 'description', 'content']}
        fields={translatePostField}
        onSuccess={refetch}
        schema={translatePostSchema}
      />
    </AdminLayout>
  )
}

export default TranslatePostPage
