import { FC } from 'react'

import { SimpleGrid } from '@chakra-ui/react'
import { ACCOUNT_STATS } from '@wsvvrijheid/mocks'
import { AccountStatsBase } from '@wsvvrijheid/types'
import { AccountStats, AdminLayout } from '@wsvvrijheid/ui'
import { InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import i18nConfig from '../next-i18next.config'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const Index: FC<PageProps> = ({ seo }) => {
  const statsData = [
    'followers',
    'tweets',
    'retweets',
    'likes',
    'followings',
    'replies',
  ]

  return (
    <AdminLayout seo={seo}>
      <SimpleGrid columns={[1, 1, 2, 2, 3]}>
        {statsData?.map((field, index) => (
          <AccountStats
            key={index}
            title={field}
            field={field as keyof AccountStatsBase}
            stats={ACCOUNT_STATS?.data}
          />
        ))}
      </SimpleGrid>
    </AdminLayout>
  )
}

export const getStaticProps = async context => {
  const { locale } = context

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
      ...(await serverSideTranslations(
        locale,
        ['common', 'admin'],
        i18nConfig,
      )),
    },
  }
}

export default Index
