import { FC, useState } from 'react'

import { MenuItem, useUpdateEffect } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Course, Sort, StrapiLocale, StrapiModel } from '@wsvvrijheid/types'
import {
  AdminLayout,
  DataTable,
  PageHeader,
  coursesColumns,
} from '@wsvvrijheid/ui'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const CoursesPage: FC<PageProps> = ({ seo }) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchTerm, setSearchTerm] = useState<string>()

  const [sort, setSort] = useState<Sort>()
  const router = useRouter()
  const { locale } = useRouter()

  const coursesQuery = useStrapiRequest<Course>({
    url: 'api/courses',
    populate: ['categories', 'tags', 'platforms', 'image', 'applications'],
    page: currentPage || 1,
    pageSize: 10,
    filters: {
      ...(searchTerm && { [`title_${locale}`]: { $containsi: searchTerm } }),
    },
    sort,
    locale,
  })

  const handleSearch = (search?: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useUpdateEffect(() => {
    coursesQuery.refetch()
  }, [locale, searchTerm, sort])

  const courses = coursesQuery?.data?.data
  const totalCount = coursesQuery?.data?.meta?.pagination?.pageCount || 0

  const mappedCourses =
    courses?.map(course => {
      const translates = []

      if (course.title_en) translates.push('en')
      if (course.title_tr) translates.push('tr')
      if (course.title_nl) translates.push('nl')

      return {
        ...course,
        translates,
      }
    }) || []

  const handleRowClick = (index: number, id: number) => {
    router.push(`/courses/${id}`)
  }

  return (
    <AdminLayout seo={seo}>
      <PageHeader
        onSearch={handleSearch}
        searchPlaceHolder={'Search courses by title'}
        sortMenu={[
          <MenuItem key="asc" icon={<FaArrowUp />}>
            Name Asc
          </MenuItem>,
          <MenuItem key="desc" icon={<FaArrowDown />}>
            Name Desc
          </MenuItem>,
        ]}
      />

      <DataTable
        columns={coursesColumns}
        data={mappedCourses as StrapiModel[]}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
        onClickRow={handleRowClick}
      />
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const title = {
    en: 'Courses',
    tr: 'Kurslar',
    nl: 'Courses',
  }

  const seo = {
    title: title[locale],
  }

  return {
    props: {
      seo,
      ...(await ssrTranslations(locale, ['admin'])),
    },
  }
}

export default CoursesPage
