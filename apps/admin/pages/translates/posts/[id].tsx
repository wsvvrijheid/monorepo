import { Post } from '@wsvvrijheid/types'
import {
  AdminLayout,
  ModelEditTranslate,
  translateModelFields,
  translateModelSchema,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'

const TranslatePostPage = () => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)

  return (
    <AdminLayout title="Post" hasBackButton>
      <ModelEditTranslate<Post>
        id={id}
        url="api/posts"
        pathname="posts"
        translatedFields={['title', 'description', 'content']}
        fields={translateModelFields}
        schema={translateModelSchema}
      />
    </AdminLayout>
  )
}

export default TranslatePostPage
