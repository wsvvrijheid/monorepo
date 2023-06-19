import { FC } from 'react'

import { Box, Stack } from '@chakra-ui/react'
import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { useModelById } from '@wsvvrijheid/services'
import { Volunteer } from '@wsvvrijheid/types'
import {
  AdminLayout,
  ModelEditForm,
  PageHeader,
  volunteerFields,
  volunteerSchema,
} from '@wsvvrijheid/ui'

import i18nConfig from '../../next-i18next.config'

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const VolunteerPage: FC<PageProps> = ({ seo }) => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)
  const {
    data: volunteer,
    isLoading,
    refetch,
  } = useModelById<Volunteer>({
    url: 'api/volunteers',
    id,
  })

  console.log('volunteer>>>>', volunteer)

  return (
    <AdminLayout seo={seo} isLoading={isLoading} hasBackButton>
     <PageHeader>
       
      </PageHeader>
     <Stack spacing={4}>
        {volunteer && (
          <Box p={4} rounded="md" bg="white" shadow="md">
            <ModelEditForm<Volunteer>
              url="api/volunteers"
              model={volunteer}
              schema={volunteerSchema}
              fields={volunteerFields}
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
      ...(await serverSideTranslations(
        locale,
        ['common', 'admin'],
        i18nConfig,
      )),
    },
  }
}

export default VolunteerPage
