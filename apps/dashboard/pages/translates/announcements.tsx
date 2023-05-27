import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { AdminLayout } from '@wsvvrijheid/ui'

import i18nConfig from '../../next-i18next.config'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const AnnouncementsTranslatePage: FC<PageProps> = ({ seo }) => {
  return (
    <AdminLayout seo={seo}>
      <Box>AnnouncementsTranslatePage</Box>
    </AdminLayout>
  )
}

export const getStaticProps = async context => {
  const { locale } = context

  const title = {
    en: 'Announcements Translate',
    tr: 'Duyurular Çeviri',
    nl: 'Aankondigingen Vertalen',
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

export default AnnouncementsTranslatePage
