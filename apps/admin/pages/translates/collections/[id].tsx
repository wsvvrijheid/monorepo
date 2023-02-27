import { FC } from 'react'

import { Activity } from '@wsvvrijheid/types'
import {
  AdminLayout,
  ModelEditTranslate,
  translateModelFields,
  translateModelSchema,
} from '@wsvvrijheid/ui'
import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import i18nConfig from '../../../next-i18next.config'

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const TranslateCollectionPage: FC<PageProps> = ({ seo }) => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)

  return (
    <AdminLayout seo={seo} hasBackButton>
      <ModelEditTranslate<Activity>
        id={id}
        url="api/collections"
        pathname="collections"
        translatedFields={['title', 'description', 'content']}
        fields={translateModelFields}
        schema={translateModelSchema}
      />
    </AdminLayout>
  )
}

export const getServerSideProps = async context => {
  const { locale } = context

  const title = {
    en: 'Collection Translate',
    tr: 'Koleksiyon Çeviri',
    nl: 'Collectie Vertalen',
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

export default TranslateCollectionPage
