import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { AdminLayout } from '@wsvvrijheid/ui'

import i18nConfig from '../../next-i18next.config'

type BlogsTranslatePageProps = InferGetStaticPropsType<typeof getStaticProps>

const BlogsTranslatePage: FC<BlogsTranslatePageProps> = ({ seo }) => {
  return (
    <AdminLayout seo={seo}>
      <Box>BlogTranslatePage</Box>
    </AdminLayout>
  )
}

export const getStaticProps = async context => {
  const { locale } = context

  const title = {
    en: 'Blog Translate',
    tr: 'Blog Çeviri',
    nl: 'Blog Vertalen',
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

export default BlogsTranslatePage
