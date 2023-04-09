import { FC } from 'react'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from '@chakra-ui/react'
import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { useModelById } from '@wsvvrijheid/services'
import { Course } from '@wsvvrijheid/types'
import {
  AdminLayout,
  courseFields,
  courseSchema,
  ModelEditForm,
} from '@wsvvrijheid/ui'

import i18nConfig from '../../next-i18next.config'

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const CoursePage: FC<PageProps> = ({ seo }) => {
  const router = useRouter()
  const { query } = router

  const id = Number(query.id as string)
  const {
    data: course,
    isLoading,
    refetch,
  } = useModelById<Course>({
    url: 'api/courses',
    id,
  })

  return (
    <AdminLayout seo={seo} isLoading={isLoading} hasBackButton>
      <Box p={6} rounded="md" bg="white" shadow="md">
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
                />
              )}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
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
