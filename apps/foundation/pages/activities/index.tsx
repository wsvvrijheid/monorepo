import { Image, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { Activity } from '@wsvvrijheid/types'
import { AnimatedBox, Card, Container, Hero } from '@wsvvrijheid/ui'
import { request } from '@wsvvrijheid/utils'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

import { Layout } from '../../components'
import i18nConfig from '../../next-i18next.config'

export default function Activities({ activities, query, title, pagination }) {
  const { locale } = useRouter()

  return (
    <Layout seo={{ title }} isDark>
      <Hero title={title} />
      {activities?.[0] ? (
        <>
          <Container>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 4 }}
              gap={{ base: 6, lg: 8 }}
              my={16}
            >
              {activities?.map((activity, i) => (
                <AnimatedBox
                  directing="to-down"
                  delay={i * 3}
                  key={activity.id}
                >
                  <Card
                    title={activity.title}
                    description={activity.description}
                    image={activity.image.url}
                    link={`/${locale}/activities/${activity.slug}`}
                  />
                </AnimatedBox>
              ))}
            </SimpleGrid>
            {/* <Pagination
              totalCount={pagination.pageCount}
              currentPage={+query.page}
              onPageChange={(page) => changeParam({ page })}
            /> */}
          </Container>
        </>
      ) : (
        <Stack minH="inherit" justify="center" align="center" spacing={8}>
          <Image h={200} src="/images/no-blog.svg" alt="no blog" />
          <Text textAlign="center" fontSize="lg">
            Sorry! No activities published in this language.
          </Text>
        </Stack>
      )}
    </Layout>
  )
}
export const getServerSideProps = async context => {
  const { locale, query } = context
  const { page } = query

  const activities = await request<Activity[]>({
    url: 'api/activities',
    page,
    pageSize: 10,
    locale,
  })

  const seo = {
    title: {
      en: 'Activities',
      nl: 'Activiteiten',
      tr: 'Faaliyetler',
    },
  }
  console.log({ activities })

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
      title: seo.title[locale],
      query: context.query,
      activities: activities.data.sort(
        (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
      ),
      pagination: activities.meta.pagination,
    },
  }
}
