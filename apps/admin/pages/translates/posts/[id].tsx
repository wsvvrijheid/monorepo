import { FC } from 'react'

import { Post } from '@wsvvrijheid/types'
import {
  AdminLayout,
  ModelEditTranslate,
  translatePostModelFields,
  translatePostModelSchema,
} from '@wsvvrijheid/ui'
import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import i18nConfig from '../../../next-i18next.config'

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const TranslatePostPage: FC<PageProps> = ({ seo }) => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)

  return (
    <AdminLayout seo={seo} hasBackButton>
      <ModelEditTranslate<Post>
        id={id}
        url="api/posts"
        pathname="posts"
        translatedFields={['description', 'content']}
        fields={translatePostModelFields}
        schema={translatePostModelSchema}
      />
    </AdminLayout>
  )
}

export const getServerSideProps = async context => {
  const { locale } = context

  const title = {
    en: 'Post Translate',
    tr: 'Post Çeviri',
    nl: 'Post Vertalen',
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

export default TranslatePostPage
