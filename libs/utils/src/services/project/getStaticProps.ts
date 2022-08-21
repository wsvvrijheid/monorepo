import { StrapiLocale } from '@wsvvrijheid/types'
import { serialize } from 'next-mdx-remote/serialize'
import { GetStaticPropsContext } from 'next/types'

import { getProjectBySlug } from './getBySlug'

export const getProjectStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale
  const code = context.params?.['code'] as string

  const project = await getProjectBySlug(code)

  if (!project) return { notFound: true }

  const projectData = {
    title: {
      en: project.name_en,
      nl: project.name_nl,
      tr: project.name_tr,
    },
    description: {
      en: project.description_en,
      nl: project.description_nl,
      tr: project.description_tr,
    },
    content: {
      en: project.content_en,
      nl: project.content_nl,
      tr: project.content_tr,
    },
  }

  const title = projectData.title[locale as StrapiLocale]
  const description = projectData.description[locale as StrapiLocale]
  const content = projectData.content[locale as StrapiLocale]
  const image = project.image
  const link = project.link

  const seo = {
    title,
    description,
    content,
  }

  const source = await serialize(content || '')

  return {
    seo,
    image,
    link,
    source,
  }
}
