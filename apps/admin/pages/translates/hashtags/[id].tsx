import { Hashtag } from '@wsvvrijheid/types'
import {
  AdminLayout,
  translateModelFields,
  translateModelSchema,
  ModelEditTranslate,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'

const TranslateMainHashtagPage = () => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)

  return (
    <AdminLayout title="Hashtags" hasBackButton>
      <ModelEditTranslate<Hashtag>
        id={id}
        url="api/hashtags"
        pathname="hashtags"
        translatedFields={['title', 'description', 'content']}
        fields={translateModelFields}
        schema={translateModelSchema}
      />
    </AdminLayout>
  )
}

export default TranslateMainHashtagPage
