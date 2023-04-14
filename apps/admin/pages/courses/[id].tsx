import { FC, useState } from 'react'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  MenuItem,
  Stack,
  Text,
  useUpdateEffect,
} from '@chakra-ui/react'
import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

import { useModelById, useSearchModel } from '@wsvvrijheid/services'
import {
  Course,
  CourseApplication,
  Sort,
  StrapiLocale,
} from '@wsvvrijheid/types'
import {
  AdminLayout,
  applicationColumns,
  courseFields,
  courseSchema,
  DataTable,
  ModelEditForm,
  PageHeader,
} from '@wsvvrijheid/ui'

import i18nConfig from '../../next-i18next.config'

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const CoursePage: FC<PageProps> = ({ seo }) => {
  const router = useRouter()

  const { locale } = useRouter()
  const { query } = router

  const [currentPage, setCurrentPage] = useState<number>()
  const [searchTerm, setSearchTerm] = useState<string>()
  const [sort, setSort] = useState<Sort>()

  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  const id = Number(query.id as string)

  const applicationsQuery = useSearchModel<CourseApplication>({
    url: 'api/course-applications',
    relationFilter: {
      parent: 'course',
      ids: [id],
    },
    page: currentPage || 1,
    pageSize: 10,
    searchTerm,
    locale: router.locale as StrapiLocale,
  })
  useUpdateEffect(() => {
    applicationsQuery.refetch()
  }, [locale, searchTerm, sort])

  const applications = applicationsQuery?.data?.data
  const totalCount = applicationsQuery?.data?.meta?.pagination?.pageCount

  const {
    data: course,
    isLoading,
    refetch,
  } = useModelById<Course>({
    url: 'api/courses',
    id,
  })

  const handleRowClick = (index: number, id: number) => {
    router.push(`/courses/applications/${id}`)
  }

  return (
    <AdminLayout seo={seo} isLoading={isLoading} hasBackButton>
      <Stack spacing={8} p={6} rounded="md" bg="white" shadow="md">
        <Accordion
          size={'lg'}
          allowToggle
          defaultIndex={0}
          borderColor="transparent"
        >
          <AccordionItem>
            <AccordionButton
              justifyContent="space-between"
              cursor="pointer"
              fontSize="xl"
            >
              <Text>{course?.[`title_${router.locale}`]}</Text>
              <AccordionIcon ml={'auto'} />
            </AccordionButton>
            <AccordionPanel p={0} mt={4}>
              {course && (
                <ModelEditForm<Course>
                  url="api/courses"
                  model={course}
                  schema={courseSchema}
                  fields={courseFields}
                  onSuccess={refetch}
                  approveRoles={[
                    'contentmanager',
                    'academyeditor',
                    'translator',
                  ]}
                  editRoles={['contentmanager', 'academyeditor', 'translator']}
                  publishRoles={['contentmanager', 'academyeditor']}
                />
              )}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Box>
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
            columns={applicationColumns}
            data={applications}
            totalCount={totalCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onSort={setSort}
            onClickRow={handleRowClick}
          />
        </Box>
      </Stack>
    </AdminLayout>
  )
}

export const getServerSideProps = async context => {
  const { locale } = context

  const title = {
    en: 'Course',
    tr: 'Kurs',
    nl: 'Course',
  }

  const seo: NextSeoProps = {
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

export default CoursePage
