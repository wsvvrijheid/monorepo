import { Button, ButtonGroup } from '@chakra-ui/react'
import { useActivityById } from '@wsvvrijheid/services'
import { Activity } from '@wsvvrijheid/types'
import {
  AdminLayout,
  ModelEditTranslate,
  Navigate,
  PageHeader,
  translateActivityField,
  translateActivitySchema,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'

const TranslateActivityPage = () => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)
  // const dataName = router.pathname.slice(12, -5)

  const { data: activity, isLoading, refetch } = useActivityById(id) //
  let original = activity

  const findOriginal = activity => {
    activity?.localizations?.map(localActivity => {
      if (localActivity.id < activity?.id) {
        original = localActivity
      } else original = activity
    })
    return original
  }

  const originalData = findOriginal(activity) as Activity

  console.log('activities', activity)
  console.log('query', query)
  console.log('router', router.pathname)

  return (
    <AdminLayout title="Activity" isLoading={isLoading} hasBackButton>
      <PageHeader>
        <ButtonGroup>
          {activity?.localizations?.map(l => (
            <Navigate key={l.id} href={`/translates/activities/${l.id}`}>
              {l?.locale !== originalData?.locale && (
                <Button textTransform={'uppercase'}>{l.locale}</Button>
              )}
            </Navigate>
          ))}
        </ButtonGroup>
      </PageHeader>
      <ModelEditTranslate
        url="api/activities"
        targetModel={activity}
        currentModel={originalData as Activity}
        translatedFields={['title', 'description', 'content']}
        fields={translateActivityField}
        onSuccess={refetch}
        schema={translateActivitySchema}
      />
    </AdminLayout>
  )
}

export default TranslateActivityPage
