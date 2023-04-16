import { FC, useEffect, useState } from 'react'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  MenuItem,
  Stack,
  Text,
  useDisclosure,
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
  courseApplicationFields,
  courseApplicationSchema,
  courseFields,
  courseSchema,
  DataTable,
  ModelEditForm,
  ModelEditModal,
  PageHeader,
} from '@wsvvrijheid/ui'

import i18nConfig from '../../next-i18next.config'

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const CoursePage: FC<PageProps> = ({ seo }) => {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { locale } = useRouter()
  const { query } = router

  const [selectedApplicationId, setSelectedApplicationId] = useState<number>()
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
    sort,
    page: currentPage || 1,
    pageSize: 100,
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
    setSelectedApplicationId(id)
  }

  useEffect(() => {
    if (selectedApplicationId) {
      onOpen()
    }
  }, [selectedApplicationId])

  const handleClose = () => {
    onClose()
    setSelectedApplicationId(undefined)
  }

  return (
    <AdminLayout seo={seo} isLoading={isLoading} hasBackButton>
      <ModelEditModal<CourseApplication>
        title={'Application'}
        url="api/course-applications"
        id={selectedApplicationId}
        schema={courseApplicationSchema}
        fields={courseApplicationFields}
        approverRoles={['academyeditor']}
        editorRoles={['academyeditor']}
        publisherRoles={['academyeditor']}
        isOpen={isOpen}
        onClose={handleClose}
        size={'5xl'}
      />
      <Stack spacing={8} p={6}>
        <Accordion
          size={'lg'}
          allowToggle
          allowMultiple={false}
          defaultIndex={0}
          borderColor="transparent"
          defaultValue={0}
        >
          <AccordionItem _notLast={{ mb: 2 }}>
            <AccordionButton
              justifyContent="space-between"
              cursor="pointer"
              fontSize="lg"
              bg={'white'}
              rounded={'md'}
              fontWeight={600}
            >
              <Text>{course?.[`title_${router.locale}`]}</Text>
              <AccordionIcon ml={'auto'} />
            </AccordionButton>
            <AccordionPanel mt={4} bg={'white'} rounded={'md'}>
              {course && (
                <ModelEditForm<Course>
                  url="api/courses"
                  model={course}
                  schema={courseSchema}
                  fields={courseFields}
                  onSuccess={refetch}
                  approverRoles={[
                    'contentmanager',
                    'academyeditor',
                    'translator',
                  ]}
                  editorRoles={[
                    'contentmanager',
                    'academyeditor',
                    'translator',
                  ]}
                  publisherRoles={['contentmanager', 'academyeditor']}
                />
              )}
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton
              justifyContent="space-between"
              cursor="pointer"
              fontSize="lg"
              bg={'white'}
              rounded={'md'}
              fontWeight={600}
            >
              <Text>Applications</Text>
              <AccordionIcon ml={'auto'} />
            </AccordionButton>
            <AccordionPanel mt={4} bg={'white'} rounded={'md'}>
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
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
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
