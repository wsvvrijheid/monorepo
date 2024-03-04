import { FC } from 'react'

import { GetStaticPropsContext } from 'next'

import { getModelStaticPaths } from '@fc/services'
import { getPlatformStaticProps } from '@fc/services/src/platform/getStaticProps'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { StrapiLocale } from '@fc/types'
import { PlatformTemplate, PlatformTemplateProps } from '@fc/ui'

import { Layout } from '../../components'

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

export const getStaticPaths = async () => {
  return await getModelStaticPaths('platforms')
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const props = await getPlatformStaticProps(context)
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
      ...props,
    },
    revalidate: 1,
  }
}
