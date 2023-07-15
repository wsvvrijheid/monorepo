import { FC } from 'react'

import { Box, Stack } from '@chakra-ui/react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { NextSeoProps } from 'next-seo'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale, User } from '@wsvvrijheid/types'
import {
  AdminLayout,
  ModelEditForm,
  PageHeader,
  userFields,
  userSchema,
} from '@wsvvrijheid/ui'

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const UserPage: FC<PageProps> = ({ seo }) => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)
  const { data, isLoading, refetch } = useStrapiRequest<User>({
    url: 'api/users',
    id,
  })

  const user = data?.data

  return (
    <AdminLayout seo={seo} isLoading={isLoading} hasBackButton>
      <PageHeader></PageHeader>
      <Stack spacing={4}>
        {user && (
          <Box p={4} rounded="md" bg="white" shadow="md">
            <ModelEditForm<User>
              url="api/users"
              model={user}
              schema={userSchema}
              fields={userFields}
              onSuccess={refetch}
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
    en: 'User',
    tr: 'Kullanici',
    nl: 'Gebruiker',
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

export default UserPage
