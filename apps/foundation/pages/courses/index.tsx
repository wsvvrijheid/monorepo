import { FC } from 'react'

import { Box, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'

import { ASSETS_URL, COURSES } from '@wsvvrijheid/config'
import { strapiRequest } from '@wsvvrijheid/lib'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Course, StrapiLocale } from '@wsvvrijheid/types'
import { AcademyCard, Container, Hero } from '@wsvvrijheid/ui'

import { Layout } from '../../components'

type CoursesProps = InferGetStaticPropsType<typeof getStaticProps>

const Platforms: FC<CoursesProps> = ({ title, courses }) => {
  const { locale } = useRouter()
  const courseBody = COURSES.info?.[locale]?.title
  const courseMainTitle = COURSES.info?.[locale]?.pagetitle

  const coursesData = courses?.data

  return (
    <Layout seo={{ title }}>
      <Hero image={'/images/courses.png'} />
      <Container>
        <Stack mb={4}>
          <Box>
            <Heading pt={8} pb={5} as="h1" fontSize="4xl" textAlign="center">
              {courseMainTitle}
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

              return (
                <AcademyCard
                  key={course?.id}
                  title={title}
                  image={ASSETS_URL + course?.image?.url}
                  href={`/courses/${course?.slug}`}
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

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const courses = await strapiRequest<Course>({
    url: 'api/courses',
    populate: '*',
  })

  const seo = {
    title: {
      en: 'Courses',
      nl: 'Curssusen',
      tr: 'Kurslar',
    },
  }

  return {
    props: {
      ...(await ssrTranslations(locale)),
      title: seo.title[locale],
      courses,
    },
    revalidate: 1,
  }
}
