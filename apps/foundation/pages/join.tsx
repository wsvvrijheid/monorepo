import { FC } from 'react'

import { GetStaticPropsContext } from 'next'
import { NextSeoProps } from 'next-seo'

import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale } from '@wsvvrijheid/types'
import { JoinTemplate, JoinTemplateProps } from '@wsvvrijheid/ui'

import { Layout } from '../components'

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
      ...(await ssrTranslations(locale)),
    },
  }
}
