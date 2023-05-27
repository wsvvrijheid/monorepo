import { FC, useState } from 'react'

import { MenuItem, useUpdateEffect } from '@chakra-ui/react'
import { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

import { useSearchModel } from '@wsvvrijheid/services'
import { Course, Sort, StrapiLocale } from '@wsvvrijheid/types'
import {
  AdminLayout,
  coursesColumns,
  DataTable,
  PageHeader,
} from '@wsvvrijheid/ui'

import i18nConfig from '../../next-i18next.config'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const CoursesPage: FC<PageProps> = ({ seo }) => {
  const [currentPage, setCurrentPage] = useState<number>()
  const [searchTerm, setSearchTerm] = useState<string>()

  const [sort, setSort] = useState<Sort>()
  const router = useRouter()
  const { locale } = useRouter()

  const coursesQuery = useSearchModel<Course>({
    url: 'api/courses',
    populate: ['categories', 'tags', 'platforms', 'image', 'applications'],
    page: currentPage || 1,
    pageSize: 10,
    searchTerm,
    sort,
    locale: locale as StrapiLocale,
  })

  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useUpdateEffect(() => {
    coursesQuery.refetch()
  }, [locale, searchTerm, sort])

  const courses = coursesQuery?.data?.data
  const totalCount = coursesQuery?.data?.meta?.pagination?.pageCount

  const mappedCourses = courses?.map(course => {
    const translates = []

    if (course.title_en) translates.push('en')
    if (course.title_tr) translates.push('tr')
    if (course.title_nl) translates.push('nl')

    return {
      ...course,
      translates,
    }
  })
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
        data={mappedCourses}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
        onClickRow={handleRowClick}
      />
    </AdminLayout>
  )
}

export const getStaticProps = async context => {
  const { locale } = context

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
      ...(await serverSideTranslations(
        locale,
        ['common', 'admin'],
        i18nConfig,
      )),
    },
  }
}

export default CoursesPage
