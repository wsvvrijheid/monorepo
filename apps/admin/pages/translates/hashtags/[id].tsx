import { FC } from 'react'

import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { Hashtag } from '@wsvvrijheid/types'
import {
  AdminLayout,
  translateModelFields,
  translateModelSchema,
  ModelEditTranslate,
} from '@wsvvrijheid/ui'

import i18nConfig from '../../../next-i18next.config'

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const TranslateMainHashtagPage: FC<PageProps> = ({ seo }) => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)

  return (
    <AdminLayout seo={seo} hasBackButton>
      <ModelEditTranslate<Hashtag>
        id={id}
        url="api/hashtags"
        pathname="hashtags"
        translatedFields={['title', 'description', 'content']}
        fields={translateModelFields as any}
        schema={translateModelSchema}
        approverRoles={['translator']}
        editorRoles={['translator']}
      />
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

export default TranslateMainHashtagPage
