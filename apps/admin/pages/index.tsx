import { FC } from 'react'

import { SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { searchModel } from '@wsvvrijheid/services'
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

const Index: FC<PageProps> = ({ seo, stats }) => {
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
            <AccountStats
              field={field as keyof AccountStatsBase}
              stats={stats}
            />
          </Stack>
        ))}
      </SimpleGrid>
    </AdminLayout>
  )
}

export const getStaticProps = async context => {
  const { locale } = context

  const statsResponse = await searchModel<AccounStatsType>({
    url: 'api/account-statistics',
    sort: ['date:desc'],
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
      stats: statsResponse?.data || [],
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
