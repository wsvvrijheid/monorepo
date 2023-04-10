import { FC } from 'react'

import { Box, Heading, Stack, SimpleGrid, Text } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

// import { searchModel } from '@wsvvrijheid/services'
// import { Courses } from '@wsvvrijheid/types'
import { SITE_URL } from '@wsvvrijheid/config'
import { searchModel } from '@wsvvrijheid/services'
import { Course, StrapiLocale, UploadFile } from '@wsvvrijheid/types'
import { Hero, Container, AcademyCard, courseInfo } from '@wsvvrijheid/ui'

import { Layout } from '../../../../components'
import i18nConfig from '../../../../next-i18next.config'

type CoursesProps = InferGetStaticPropsType<typeof getStaticProps>

const Platforms: FC<CoursesProps> = ({ title, pagetitle, courses }) => {
  const { locale } = useRouter()
  const courseBody = courseInfo?.[locale as StrapiLocale]?.title

  const coursesData = courses?.data

  return (
    <Layout seo={{ title }}>
      <Hero
        image={`${SITE_URL}/${locale}/uploads/courses_image_3c3a1382bd.png`}
      />
      <Container>
        <Stack mb={4}>
          <Box>
            <Heading pt={8} pb={5} as="h1" fontSize="4xl" textAlign="center">
              {pagetitle}
            </Heading>
          </Box>
          <Box>
            <Text>{courseBody}</Text>
          </Box>
          <Box>
            <Heading pt={8} pb={5} as="h4" fontSize="2xl">
              {title}
            </Heading>
          </Box>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            gap={{ base: 6, lg: 8 }}
          >
            {coursesData?.map(course => {
              const title = course?.[`title_${locale}`]
              const description = course?.[`description_${locale}`]
              console.log('course data ', course?.id)

              return (
                <AcademyCard
                  key={course?.id}
                  title={title}
                  image={course?.image as UploadFile}
                  href={`${SITE_URL}/${locale}/platforms/academy/courses/${course?.id}`}
                  description={description}
                />
              )
            })}
          </SimpleGrid>
        </Stack>
      </Container>
    </Layout>
  )
}

export default Platforms
// course.content_en`content_${locale as StrapiLocale}`
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { locale } = context

  const courses = await searchModel<Course>({
    url: 'api/courses',
  })

  const seo = {
    title: {
      en: 'Courses',
      nl: 'Curssusen',
      tr: 'Kurslar',
    },
    pagetitle: {
      en: 'About Courses',
      tr: 'Kurslar Hakkinda',
      nl: 'Over Cursussen',
    },
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
      title: seo.title[locale],
      pagetitle: seo.pagetitle[locale],
      courses,
    },
  }
}
