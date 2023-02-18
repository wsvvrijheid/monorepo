import { Button, ButtonGroup } from '@chakra-ui/react'
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
  title: yup.string(),
  description: yup.string(),
  content: yup.string(),
})

export const translatedField: FormFields<Post> = [
  { name: 'title', type: 'textarea' },

  { name: 'description', type: 'textarea' },

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
        fields={translatedField}
        onSuccess={refetch}
        schema={translatePostSchema}
      />
    </AdminLayout>
  )
}

export default TranslatePage
