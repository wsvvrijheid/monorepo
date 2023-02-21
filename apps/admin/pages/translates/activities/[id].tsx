import { Activity } from '@wsvvrijheid/types'
import {
  AdminLayout,
  ModelEditTranslate,
  translateActivityField,
  translateActivitySchema,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'

const TranslateActivityPage = () => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)

  return (
    <AdminLayout title="Activity" hasBackButton>
      <ModelEditTranslate<Activity>
        id={id}
        url="api/activities"
        translatedFields={['title', 'description', 'content']}
        fields={translateActivityField}
        schema={translateActivitySchema}
      />
    </AdminLayout>
  )
}

export default TranslateActivityPage
