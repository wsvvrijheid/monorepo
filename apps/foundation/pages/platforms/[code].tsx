import { FC } from 'react'

import { ProjectTemplate, ProjectTemplateProps } from '@wsvvrijheid/ui'
import {
  getProjectStaticPaths,
  getProjectStaticProps,
} from '@wsvvrijheid/utils'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout } from '../../components'
import i18nConfig from '../../next-i18next.config'

const ProjectDetailPage: FC<ProjectTemplateProps> = ({
  seo,
  source,
  image,
  link,
}) => {
  if (!source) return null

  return (
    <Layout seo={seo}>
      <ProjectTemplate seo={seo} source={source} image={image} link={link} />
    </Layout>
  )
}
export default ProjectDetailPage

export const getStaticPaths = getProjectStaticPaths

export const getStaticProps = async context => {
  const props = await getProjectStaticProps(context)
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
      ...props,
    },
    revalidate: 1,
  }
}
