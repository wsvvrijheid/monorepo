import { Art } from '@wsvvrijheid/types'
import {
  AdminLayout,
  ModelEditTranslate,
  translateModelFields,
  translateModelSchema,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'

const TranslateArtsPage = () => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)

  return (
    <AdminLayout title="Arts" hasBackButton>
      <ModelEditTranslate<Art>
        id={id}
        url="api/arts"
        pathname="arts"
        translatedFields={['title', 'description', 'content']}
        fields={translateModelFields}
        schema={translateModelSchema}
      />
    </AdminLayout>
  )
}

export default TranslateArtsPage
