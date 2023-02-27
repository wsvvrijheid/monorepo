import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { useModelById } from '@wsvvrijheid/services'
import { Activity } from '@wsvvrijheid/types'
import {
  activityFields,
  activitySchema,
  AdminLayout,
  FormLocaleSwitcher,
  ModelEditForm,
  PageHeader,
} from '@wsvvrijheid/ui'
import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import i18nConfig from '../../next-i18next.config'

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const ActivityPage: FC<PageProps> = ({ seo }) => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)
  const {
    data: activity,
    isLoading,
    refetch,
  } = useModelById<Activity>({
    url: 'api/activities',
    id,
  })

  return (
    <AdminLayout seo={seo} isLoading={isLoading} hasBackButton>
      <PageHeader>
        <FormLocaleSwitcher
          models={activity?.localizations}
          slug={'activities'}
        />
      </PageHeader>
      <Box p={6} rounded="md" bg="white" shadow="md">
        {activity && (
          <ModelEditForm<Activity>
            url="api/activities"
            model={activity}
            schema={activitySchema}
            translatedFields={['title', 'description', 'content']}
            fields={activityFields}
            onSuccess={refetch}
          />
        )}
      </Box>
    </AdminLayout>
  )
}

export const getServerSideProps = async context => {
  const { locale } = context

  const title = {
    en: 'Activity Translate',
    tr: 'Aktivite Çeviri',
    nl: 'Activiteit Vertalen',
  }

  const seo: NextSeoProps = {
    title: title[locale],
  }

  return {
    props: {
      seo,
      ...(await serverSideTranslations(
        locale,
        ['common', 'admin'],
        i18nConfig,
      )),
    },
  }
}

export default ActivityPage
