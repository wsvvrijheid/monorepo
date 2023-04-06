import { FC } from 'react'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import i18nConfig from 'next-i18next.config'
import { NextSeoProps } from 'next-seo'

import { getPlatformStaticProps } from '@wsvvrijheid/services'
import { AcademyTemplate } from '@wsvvrijheid/ui'

import { Layout } from '../../../components'

type AcademyProps = {
  seo: NextSeoProps
}
const Academy: FC<AcademyProps> = ({ seo }) => {
  return (
    <Layout seo={seo}>
      <AcademyTemplate />
    </Layout>
  )
}

export default Academy

export const getStaticProps = async context => {
  const props = await getPlatformStaticProps(context)
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
      ...props,
    },
    revalidate: 1,
  }
}
