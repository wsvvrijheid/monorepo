import { FC } from 'react'

import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { StrapiLocale } from '@wsvvrijheid/types'
import { JoinTemplate, JoinTemplateProps } from '@wsvvrijheid/ui'

import { Layout } from '../components'
import i18nConfig from '../next-i18next.config'

const JoinPage: FC<JoinTemplateProps & { seo: NextSeoProps }> = ({
  seo,
  title,
}) => {
  return (
    <Layout seo={seo}>
      <JoinTemplate title={title} />
    </Layout>
  )
}
export default JoinPage

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const title = {
    en: 'Join us',
    tr: 'Bize Katıl',
    nl: 'Doe met ons mee',
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
      title: title[locale],
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
  }
}
