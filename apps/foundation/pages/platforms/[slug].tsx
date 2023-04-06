/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { FC } from 'react'

import { GetStaticPaths } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import {
  getModelStaticPaths,
  getPlatformStaticProps,
} from '@wsvvrijheid/services'
import { StrapiLocale } from '@wsvvrijheid/types'
import {
  AcademyTemplate,
  PlatformTemplate,
  PlatformTemplateProps,
} from '@wsvvrijheid/ui'

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
      {seo.title === 'Wees Academy' ? (
        <AcademyTemplate seo={seo} image={image} />
      ) : (
        <PlatformTemplate seo={seo} source={source} image={image} link={link} />
      )}
    </Layout>
  )
}
export default PlatformDetailPage

export const getStaticPaths: GetStaticPaths = async context => {
  return await getModelStaticPaths(
    'api/platforms',
    context.locales as StrapiLocale[],
  )
}

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
