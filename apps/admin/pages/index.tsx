import { FC } from 'react'

import { SimpleGrid } from '@chakra-ui/react'
import { AccountStats, AdminLayout } from '@wsvvrijheid/ui'
import { InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import i18nConfig from '../next-i18next.config'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const Index: FC<PageProps> = ({ seo }) => {
  return (
    <AdminLayout seo={seo}>
      <SimpleGrid columns={[1, 1, 2, 2, 3]}>
        <AccountStats title="Followers" />
        <AccountStats title="Tweets" />
        <AccountStats title="ReTweets" />
        <AccountStats title="Likes" />
        <AccountStats title="Following" />
        <AccountStats title="Replies" />
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
