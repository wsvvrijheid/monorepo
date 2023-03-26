import { FC } from 'react'

import { SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import {
  searchModel,
  SearchModelArgs,
  useSearchModel,
} from '@wsvvrijheid/services'
import {
  AccountStats as AccounStatsType,
  AccountStatsBase,
} from '@wsvvrijheid/types'
import { AccountStats, AdminLayout } from '@wsvvrijheid/ui'
import { InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import i18nConfig from '../next-i18next.config'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const args: SearchModelArgs<AccounStatsType> = {
  url: 'api/account-statistics',
  sort: ['date:asc'],
  pageSize: 100,
}

const Index: FC<PageProps> = ({ seo }) => {
  // TODO: Add pagination with keep previous data
  // Strapi fetches at max 100 items
  const statsQuery = useSearchModel(args)

  const statsData = [
    'tweets',
    'replies',
    'retweets',
    'likes',
    'followers',
    'followings',
  ]

  return (
    <AdminLayout seo={seo}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
        {statsData?.map((field, index) => (
          <Stack key={index} p={4} bg={'white'} shadow={'md'} rounded={'md'}>
            <Text
              textAlign={'center'}
              textTransform={'capitalize'}
              fontWeight={700}
              fontSize={'lg'}
            >
              {field}
            </Text>
            {statsQuery.data?.data && (
              <AccountStats
                field={field as keyof AccountStatsBase}
                stats={statsQuery.data.data}
              />
            )}
          </Stack>
        ))}
      </SimpleGrid>
    </AdminLayout>
  )
}

export const getStaticProps = async context => {
  const { locale } = context

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['account-stats'], () => {
    return searchModel<AccounStatsType>(args)
  })

  const title = {
    en: 'Home',
    tr: 'Anasayfa',
    nl: 'Home',
  }

  const seo: NextSeoProps = {
    title: title[locale],
  }

  return {
    props: {
      seo,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(
        locale,
        ['common', 'admin'],
        i18nConfig,
      )),
    },
    revalidate: 1,
  }
}

export default Index
