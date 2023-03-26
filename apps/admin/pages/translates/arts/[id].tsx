import { FC } from 'react'

// import { Art } from '@wsvvrijheid/types'
import {
  AdminLayout,
  // ModelEditTranslate,
  // translateModelFields,
  // translateModelSchema,
} from '@wsvvrijheid/ui'
import { InferGetServerSidePropsType } from 'next'
// import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import i18nConfig from '../../../next-i18next.config'

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const TranslateArtsPage: FC<PageProps> = ({ seo }) => {
  // const router = useRouter()
  // const { query } = router

  // const id = Number(query.id as string)

  return (
    <AdminLayout seo={seo} hasBackButton>
      {/* <ModelEditTranslate<Art>
        id={id}
        url="api/arts"
        pathname="arts"
        translatedFields={['title', 'description', 'content']}
        fields={translateModelFields}
        schema={translateModelSchema}
      /> */}
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

export default TranslateArtsPage
