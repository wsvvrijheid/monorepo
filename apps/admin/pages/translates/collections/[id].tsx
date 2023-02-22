import { Activity } from '@wsvvrijheid/types'
import {
  AdminLayout,
  ModelEditTranslate,
  translateModelFields,
  translateModelSchema,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'

const TranslateCollectionPage = () => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)

  return (
    <AdminLayout title="Collection" hasBackButton>
      <ModelEditTranslate<Activity>
        id={id}
        url="api/collections"
        pathname="collections"
        translatedFields={['title', 'description', 'content']}
        fields={translateModelFields}
        schema={translateModelSchema}
      />
    </AdminLayout>
  )
}

export default TranslateCollectionPage
