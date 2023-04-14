import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { useModelById } from '@wsvvrijheid/services'
import { CourseApplication } from '@wsvvrijheid/types'
import {
  AdminLayout,
  courseApplicationFields,
  courseApplicationSchema,
  ModelEditForm,
  PageHeader,
} from '@wsvvrijheid/ui'

import i18nConfig from '../../../next-i18next.config'

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const CourseApplicationPage: FC<PageProps> = ({ seo }) => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)

  const {
    data: application,
    isLoading,
    refetch,
  } = useModelById<CourseApplication>({
    url: 'api/course-applications',
    id,
  })

  return (
    <AdminLayout seo={seo} isLoading={isLoading} hasBackButton>
      <PageHeader />
      <Box p={6} rounded="md" bg="white" shadow="md">
        {application && (
          <ModelEditForm<CourseApplication>
            url="api/course-applications"
            model={application}
            schema={courseApplicationSchema}
            fields={courseApplicationFields}
            onSuccess={refetch}
            approveRoles={['academyeditor']}
            editRoles={['academyeditor']}
            publishRoles={['academyeditor']}
          />
        )}
      </Box>
    </AdminLayout>
  )
}

export const getServerSideProps = async context => {
  const { locale } = context

  const title = {
    en: 'Course Application',
    tr: 'Kurs Başvurusu',
    nl: 'Cursus Aanvraag',
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

export default CourseApplicationPage
