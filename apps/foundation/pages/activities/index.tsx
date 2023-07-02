import { FC } from 'react'

import { Image, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { i18nConfig } from '@wsvvrijheid/config'
import { searchModel } from '@wsvvrijheid/services'
import { Activity, StrapiLocale, UploadFile } from '@wsvvrijheid/types'
import {
  AnimatedBox,
  Card,
  Container,
  Hero,
  Pagination,
  useChangeParams,
} from '@wsvvrijheid/ui'

import { Layout } from '../../components'

type ActivitiesProps = InferGetServerSidePropsType<typeof getServerSideProps>

const Activities: FC<ActivitiesProps> = ({
  activities,
  query,
  title,
  pagination,
}) => {
  const { locale } = useRouter()

  const changeParam = useChangeParams()

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
                    description={activity.description || ''}
                    image={activity.image as UploadFile}
                    link={`/${locale}/activities/${activity.slug}`}
                  />
                </AnimatedBox>
              ))}
            </SimpleGrid>
            {pagination && (
              <Pagination
                totalCount={pagination.pageCount}
                currentPage={+(query.page || 1)}
                onPageChange={page => changeParam({ page })}
              />
            )}
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

export default Activities

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale
  const query = context.query as { page: string }
  const page = Number(query.page)

  const activities = await searchModel<Activity>({
    url: 'api/activities',
    locale,
    page,
    filters: {
      approvalStatus: { $eq: 'approved' },
    },
    fields: ['title', 'description', 'image', 'slug'],
  })

  const seo = {
    title: {
      en: 'Activities',
      nl: 'Activiteiten',
      tr: 'Faaliyetler',
    },
  }

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
