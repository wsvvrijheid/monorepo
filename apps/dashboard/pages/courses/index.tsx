import { useState } from 'react'

import { useUpdateEffect } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useStrapiRequest } from '@fc/services'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { Course, Sort, StrapiLocale } from '@fc/types'
import { AdminLayout, DataTable, PageHeader, useColumns } from '@fc/ui'
import { MailChimpProps } from '@fc/ui/src/components/CourseDetailPage/MailChimp'

const CoursesPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const [searchTerm, setSearchTerm] = useState<string>()

  const { t } = useTranslation()

  const [sort, setSort] = useState<Sort>()
  const router = useRouter()
  const { locale } = useRouter()

  const columns = useColumns<Course>()

  const coursesQuery = useStrapiRequest<Course>({
    endpoint: 'courses',
    populate: ['categories', 'tags', 'platforms', 'image', 'applications'],
    page: currentPage || 1,
    pageSize,
    filters: {
      ...(searchTerm && { [`title_${locale}`]: { $containsi: searchTerm } }),
    },
    sort,
    locale,
    includeDrafts: true,
  })

  const handleSearch = (search?: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useUpdateEffect(() => {
    coursesQuery.refetch()
  }, [locale, searchTerm, sort])

  const courses = coursesQuery?.data?.data
  const pageCount = coursesQuery?.data?.meta?.pagination?.pageCount || 0
  const totalCount = coursesQuery?.data?.meta?.pagination?.total || 0

  const mappedCourses =
    courses?.map(course => {
      const translates = []

      if (course.title_en) translates.push('en')
      if (course.title_tr) translates.push('tr')
      if (course.title_nl) translates.push('nl')

      /*
       this code is just a workaround for old courses
       that don't have mailchimp data
       */
      const asProp = course.mailchimp as unknown as MailChimpProps
      if (!asProp || !asProp.courseId) {
        course.mailchimp = {
          courseId: course.id,
        }
      }

      return {
        ...course,
        translates,
      }
    }) || []

  const handleRowClick = (index: number, id: number) => {
    router.push(`/courses/${id}`)
  }

  return (
    <AdminLayout seo={{ title: t('courses') }}>
      <PageHeader onSearch={handleSearch} />

      <DataTable<Course>
        columns={columns.courses!}
        currentPage={currentPage}
        data={mappedCourses as Course[]}
        onClickRow={handleRowClick}
        onSort={setSort}
        pageCount={pageCount}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        totalCount={totalCount}
      />
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}

export default CoursesPage
