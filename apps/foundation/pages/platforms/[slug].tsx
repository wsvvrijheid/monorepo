import { FC } from 'react'

import { PlatformTemplate, PlatformTemplateProps } from '@wsvvrijheid/ui'
import {
  getPlatformStaticPaths,
  getPlatformStaticProps,
} from '@wsvvrijheid/utils'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout } from '../../components'
import i18nConfig from '../../next-i18next.config'

const PlatformDetailPage: FC<PlatformTemplateProps> = ({
  seo,
  source,
  image,
  link,
}) => {
  if (!source) return null

  return (
    <Layout seo={seo}>
      <PlatformTemplate seo={seo} source={source} image={image} link={link} />
    </Layout>
  )
}
export default PlatformDetailPage

export const getStaticPaths = getPlatformStaticPaths

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
