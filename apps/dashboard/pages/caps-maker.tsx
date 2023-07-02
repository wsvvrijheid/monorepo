import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale } from '@wsvvrijheid/types'
import { AdminLayout } from '@wsvvrijheid/ui'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const CapsMakerPage: FC<PageProps> = ({ seo }) => {
  return (
    <AdminLayout seo={seo}>
      <Box>CapsMaker</Box>
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const title = {
    en: 'CapsMaker',
    tr: 'CapsMaker',
    nl: 'CapsMaker',
  }

  const description = {
    en: '',
    tr: '',
    nl: '',
  }
  const seo = {
    title: title[locale],
    description: description[locale],
  }

  return {
    props: {
      seo,
      ...(await ssrTranslations(locale, ['admin'])),
    },
  }
}

export default CapsMakerPage
