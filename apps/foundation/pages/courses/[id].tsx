import { FC } from 'react'

import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'

import { API_URL, SITE_URL } from '@wsvvrijheid/config'
import { getModelById, searchModel } from '@wsvvrijheid/services'
import { Course, StrapiLocale } from '@wsvvrijheid/types'
import { CourseDetailPage } from '@wsvvrijheid/ui'

import { Layout } from '../../components'
import i18nConfig from '../../next-i18next.config'

type CoursePageProps = {
  seo: NextSeoProps
  source: MDXRemoteSerializeResult
  course: Course
}

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

export const getStaticPaths: GetStaticPaths = async context => {
  const artsResponse = await searchModel<Course>({
    url: 'api/courses',
  })

  const paths = artsResponse.data?.map(({ id }) => ({
    params: { id: `${id}` },
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async context => {
  const { params } = context
  const queryClient = new QueryClient()

  const locale = context.locale as StrapiLocale

  // See: `useGetArt` (services/art/find-one.js)
  // [art, locale, slug]

  const course = await getModelById<Course>({
    url: 'api/courses',
    id: Number(params.id),
  })

  console.log('course', course)

  if (!course)
    return {
      notFound: true,
    }

  const titleKey = `title_${locale}`
  const descriptionKey = `description_${locale}`
  const contentKey = `content_${locale}`

  const title = course[titleKey] || null
  const description = course[descriptionKey] || null
  const content = course[contentKey]
  const slug = course.slug

  const image = course.image

  const source = await serialize(content || '')

  const seo = {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${SITE_URL}/club/arts/${slug}`,
      images: image
        ? [
            {
              url: API_URL + image.url,
              secureUrl: API_URL + image.url,
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
    revalidate: 1,
  }
}
