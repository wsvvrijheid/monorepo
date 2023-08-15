import { FC } from 'react'

import { Box, Stack } from '@chakra-ui/react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { NextSeoProps } from 'next-seo'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { StrapiLocale, UserFeedback } from '@wsvvrijheid/types'
import {
  AdminLayout,
  ModelEditForm,
  PageHeader,
  userFeedbackFields,
  userFeedbackSchema,
} from '@wsvvrijheid/ui'

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const UserFeedbackPage: FC<PageProps> = ({ seo }) => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)
  const { data, isLoading, refetch } = useStrapiRequest<UserFeedback>({
    url: 'api/user-feedbacks',
    id,
  })

  const userFeedback = data?.data

  return (
    <AdminLayout seo={seo} isLoading={isLoading} hasBackButton>
      <PageHeader></PageHeader>
      <Stack spacing={4}>
        {userFeedback && (
          <Box p={4} rounded="md" bg="white" shadow="md">
            <ModelEditForm<UserFeedback>
              url="api/user-feedbacks"
              model={userFeedback}
              schema={userFeedbackSchema}
              translatedFields={['comment']}
              fields={userFeedbackFields}
              onSuccess={refetch}
              approverRoles={['admin']}
              editorRoles={['admin']}
              publisherRoles={['admin']}
            />
          </Box>
        )}
      </Stack>
    </AdminLayout>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale

  const title = {
    en: 'Feedback',
    tr: 'Geri bildirm',
    nl: 'Feedback',
  }

  const seo: NextSeoProps = {
    title: title[locale],
  }

  return {
    props: {
      seo,
    },
  }
}

export default UserFeedbackPage
