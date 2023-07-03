import { FC } from 'react'

import { GetStaticPropsContext } from 'next'

import {
  getModelStaticPaths,
  getPlatformStaticProps,
} from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale } from '@wsvvrijheid/types'
import { PlatformTemplate, PlatformTemplateProps } from '@wsvvrijheid/ui'

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
  return await getModelStaticPaths('api/platforms')
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
