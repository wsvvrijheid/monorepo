import { Hashtag } from '@wsvvrijheid/types'
import {
  AdminLayout,
  ModelEditTranslate,
  translateHashtagField,
  translateHashtagSchema,
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
        fields={translateHashtagField}
        schema={translateHashtagSchema}
      />
    </AdminLayout>
  )
}

export default TranslateMainHashtagPage
