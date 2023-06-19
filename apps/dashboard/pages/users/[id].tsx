import { FC } from 'react'

import { Box, Stack } from '@chakra-ui/react'
import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { useModelById } from '@wsvvrijheid/services'
import { User } from '@wsvvrijheid/types'
import {
  AdminLayout,
  ModelEditForm,
  PageHeader,
  userFields,
  userSchema,
} from '@wsvvrijheid/ui'

import i18nConfig from '../../next-i18next.config'

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const UserPage: FC<PageProps> = ({ seo }) => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)
  const {
    data: user,
    isLoading,
    refetch,
  } = useModelById<User>({
    url: 'api/users',
    id,
  })

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
              approverRoles={['accountmanager', 'translator']}
              editorRoles={['contentmanager', 'translator', 'accountmanager']}
              publisherRoles={['contentmanager', 'accountmanager']}
            />
          </Box>
        )}
       
      </Stack>
    </AdminLayout>
  )
}

export const getServerSideProps = async context => {
  const { locale } = context

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
      ...(await serverSideTranslations(
        locale,
        ['common', 'admin'],
        i18nConfig,
      )),
    },
  }
}

export default UserPage
