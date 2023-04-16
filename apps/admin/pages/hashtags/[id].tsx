import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { useModelById } from '@wsvvrijheid/services'
import { Hashtag } from '@wsvvrijheid/types'
import {
  AdminLayout,
  mainHashtagFields,
  mainHashtagSchema,
  ModelEditForm,
  PageHeader,
  FormLocaleSwitcher,
} from '@wsvvrijheid/ui'

import i18nConfig from '../../next-i18next.config'

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const MainHashtagPage: FC<PageProps> = ({ seo }) => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)
  const {
    data: hashtag,
    isLoading,
    refetch,
  } = useModelById<Hashtag>({
    url: 'api/hashtags',
    id,
  })

  return (
    <AdminLayout seo={seo} isLoading={isLoading} hasBackButton>
      <PageHeader>
        <FormLocaleSwitcher models={hashtag?.localizations} slug={'hashtags'} />
      </PageHeader>
      <Box p={6} rounded="md" bg="white" shadow="md">
        {hashtag && (
          <ModelEditForm<Hashtag>
            url="api/hashtags"
            model={hashtag}
            schema={mainHashtagSchema}
            translatedFields={['title', 'description', 'content']}
            fields={mainHashtagFields}
            onSuccess={refetch}
            approverRoles={['contentmanager', 'translator', 'accountmanager']}
            editorRoles={['contentmanager', 'translator', 'accountmanager']}
            publisherRoles={['accountmanager']}
          />
        )}
      </Box>
    </AdminLayout>
  )
}

export const getServerSideProps = async context => {
  const { locale } = context

  const title = {
    en: 'Hashtag Translate',
    tr: 'Hashtag Çeviri',
    nl: 'Hashtag Vertalen',
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

export default MainHashtagPage
