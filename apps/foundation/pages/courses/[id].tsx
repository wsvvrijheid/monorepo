import { FC } from 'react'

import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { getCourseServerProps } from '@wsvvrijheid/services'
import { Course, StrapiLocale } from '@wsvvrijheid/types'

import { Layout } from '../../components'
import i18nConfig from '../../next-i18next.config'

type CoursePageProps = {
  seo: NextSeoProps
  course: Course
}

const CourseDetailPage: FC<CoursePageProps> = ({ seo, course }) => {
  return (
    <Layout seo={seo} isDark hasScroll>
      {/* <CourseDetailPage course={course} /> */}
    </Layout>
  )
}
export default CourseDetailPage

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = new QueryClient()
  const { course } = await getCourseServerProps(context)
  const locale = context.locale as StrapiLocale

  if (!course) return { notFound: true }

  const title = course?.[`title_${locale}`] || 'Course'

  const seo = {
    title,
  }
  console.log('course', course)

  return {
    props: {
      seo,
      course,

      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
  }
}
