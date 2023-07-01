import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import i18nConfig from '@wsvvrijheid/config/next-i18next.config'
import { StrapiLocale } from '@wsvvrijheid/types'
import { AdminLayout } from '@wsvvrijheid/ui'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const NotAllowed: FC<PageProps> = ({ seo }) => {
  return (
    <AdminLayout seo={seo}>
      <Box>{seo.title}</Box>
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const title = {
    en: 'Not Allowed',
    tr: 'İzin Verilmedi',
    nl: 'Niet Toegestaan',
  }

  const seo = {
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

export default NotAllowed
