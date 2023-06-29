import { FC } from 'react'

import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSidePropsContext, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { serialize } from 'next-mdx-remote/serialize'

import { ASSETS_URL, SITE_URL } from '@wsvvrijheid/config'
import { getCourseBySlug } from '@wsvvrijheid/services'
import { StrapiLocale } from '@wsvvrijheid/types'
import { CourseDetailPage } from '@wsvvrijheid/ui'

import { Layout } from '../../components'
import i18nConfig from '../../next-i18next.config'

type CoursePageProps = InferGetStaticPropsType<typeof getServerSideProps>

const CoursePage: FC<CoursePageProps> = ({ seo, source, course }) => {
  return (
    <Layout seo={seo}>
      {course && (
        <CourseDetailPage source={source} course={course} courses={[]} />
      )}
    </Layout>
  )
}

export default CoursePage

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { params } = context
  const queryClient = new QueryClient()

  const locale = context.locale as StrapiLocale

  const course = await getCourseBySlug(params?.slug as string)

  if (!course)
    return {
      notFound: true,
    }

  const title = course[`title_${locale}`] || ''
  const description = course[`description_${locale}`] || ''
  const content = course[`content_${locale}`] || ''
  const slug = course.slug

  const source = await serialize(content || '')

  const image = course.image

  const seo = {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${SITE_URL}/courses/${slug}`,
      images: image
        ? [
            {
              url: ASSETS_URL + image.url,
              secureUrl: ASSETS_URL + image.url,
              type: image.mime,
              width: image.width,
              height: image.height,
              alt: title,
            },
          ]
        : [],
    },
  }

  return {
    props: {
      seo,
      source,
      course,
      slugs: { en: slug, nl: slug, tr: slug },
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
  }
}
