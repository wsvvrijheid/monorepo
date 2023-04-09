import { FC } from 'react'

import { Box, Heading, Stack, SimpleGrid, Text } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

// import { searchModel } from '@wsvvrijheid/services'
// import { Courses } from '@wsvvrijheid/types'
import { Hero, Container, AcademyCard } from '@wsvvrijheid/ui'

import { Layout } from '../../../components'
import i18nConfig from '../../../next-i18next.config'

type CoursesProps = InferGetStaticPropsType<typeof getStaticProps>

const Platforms: FC<CoursesProps> = ({ title, pagetitle }) => {
  return (
    <Layout seo={{ title }}>
      <Hero image="https://api.wsvvrijheid.nl/uploads/courses_image_3c3a1382bd.png" />
      <Container>
        <Stack>
          <Box>
            <Heading pt={8} pb={5} as="h1" fontSize="4xl" textAlign="center">
              {pagetitle}
            </Heading>
          </Box>
          <Box>
            <Text>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam,
              ab quo voluptas, praesentium quos neque alias deleniti suscipit
              veniam nisi qui laboriosam dolores molestiae recusandae minima
              illum! Voluptas, perspiciatis fugit!
              <br /> <br />
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam,
              ab quo voluptas, praesentium quos neque alias deleniti suscipit
              veniam nisi qui laboriosam dolores molestiae recusandae minima
              illum! Voluptas, perspiciatis fugit!
              <br /> <br />
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam,
              ab quo voluptas, praesentium quos neque alias deleniti suscipit
              veniam nisi qui laboriosam dolores molestiae recusandae minima
              illum! Voluptas, perspiciatis fugit!
            </Text>
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
            <AcademyCard
              image="https://api.wsvvrijheid.nl/uploads/large_yol_amsterdam_activity_1f5c4f8f70.jpeg"
              href="#"
              description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio omnis libero reiciendis fugiat facere ut, necessitatibus possimus beatae et dolorem illum id neque quaerat facilis sed sit error cupiditate voluptate! Lorem"
            >
              Yonetmelik Kursu
            </AcademyCard>
            <AcademyCard
              image="https://api.wsvvrijheid.nl/uploads/large_yol_amsterdam_activity_1f5c4f8f70.jpeg"
              href="#"
              description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio omnis libero reiciendis fugiat facere ut, necessitatibus possimus beatae et dolorem illum id neque quaerat facilis sed sit error cupiditate voluptate! Lorem"
            >
              Yonetmelik Kursu
            </AcademyCard>
            <AcademyCard
              image="https://api.wsvvrijheid.nl/uploads/large_yol_amsterdam_activity_1f5c4f8f70.jpeg"
              href="#"
              description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio omnis libero reiciendis fugiat facere ut, necessitatibus possimus beatae et dolorem illum id neque quaerat facilis sed sit error cupiditate voluptate! Lorem"
            >
              Yonetmelik Kursu
            </AcademyCard>
          </SimpleGrid>
        </Stack>
      </Container>
    </Layout>
  )
}

export default Platforms

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { locale } = context

  //   const courses = await searchModel<Platform>({
  //     url: 'api/courses',
  //   })

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
      //   courses,
    },
  }
}
