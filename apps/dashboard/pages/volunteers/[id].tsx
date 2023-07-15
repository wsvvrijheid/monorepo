import { FC } from 'react'

import { Box, Stack } from '@chakra-ui/react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { NextSeoProps } from 'next-seo'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale, Volunteer } from '@wsvvrijheid/types'
import {
  AdminLayout,
  ModelEditForm,
  PageHeader,
  volunteerFields,
  volunteerSchema,
} from '@wsvvrijheid/ui'

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const VolunteerPage: FC<PageProps> = ({ seo }) => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)
  const { data, isLoading, refetch } = useStrapiRequest<Volunteer>({
    url: 'api/volunteers',
    id,
  })

  const volunteer = data?.data

  return (
    <AdminLayout seo={seo} isLoading={isLoading} hasBackButton>
      <PageHeader></PageHeader>
      <Stack spacing={4}>
        {volunteer && (
          <Box p={4} rounded="md" bg="white" shadow="md">
            <ModelEditForm<Volunteer>
              url="api/volunteers"
              model={volunteer}
              schema={volunteerSchema}
              fields={volunteerFields}
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
    en: 'Volunteer',
    tr: 'Gonulluler',
    nl: 'Vrijveligers',
  }

  const seo: NextSeoProps = {
    title: title[locale],
  }

  return {
    props: {
      seo,
      ...(await ssrTranslations(locale, ['admin'])),
    },
  }
}

export default VolunteerPage
