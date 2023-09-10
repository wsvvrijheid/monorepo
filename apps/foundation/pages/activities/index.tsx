import { FC } from 'react'

import { Image, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'

import { RequestCollectionArgs } from '@wsvvrijheid/lib'
import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
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

const args: RequestCollectionArgs = {
  endpoint: 'activities',
  sort: ['date:desc'],
  filters: { approvalStatus: { $eq: 'approved' } },
  populate: ['image'],
  fields: ['title', 'description', 'slug'],
}

type ActivitiesProps = InferGetServerSidePropsType<typeof getStaticProps>

const Activities: FC<ActivitiesProps> = ({ title }) => {
  const { locale, query } = useRouter()

  const page = +(query.page || 1)

  const changeParam = useChangeParams()

  const activitiesQuery = useStrapiRequest<Activity>({
    ...args,
    locale,
    page,
  })

  const { data, isLoading } = activitiesQuery

  const pagination = data?.meta?.pagination
  const activities = data?.data || []

  return (
    <Layout seo={{ title }} isDark>
      <Hero title={title} />

      {activities[0] || isLoading ? (
        <>
          <Container>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 4 }}
              gap={{ base: 6, lg: 8 }}
              my={16}
            >
              {activities.map((activity, i) => (
                <AnimatedBox directing="to-down" delay={i} key={activity.id}>
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

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const seo = {
    title: {
      en: 'Activities',
      nl: 'Activiteiten',
      tr: 'Faaliyetler',
    },
  }

  return {
    props: {
      ...(await ssrTranslations(locale)),
      title: seo.title[locale],
    },
    revalidate: 1,
  }
}
