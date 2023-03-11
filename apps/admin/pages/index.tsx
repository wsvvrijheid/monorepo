import { FC } from 'react'

import { SimpleGrid } from '@chakra-ui/react'
import { AdminLayout, Caps } from '@wsvvrijheid/ui'
import { InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import i18nConfig from '../next-i18next.config'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const Index: FC<PageProps> = ({ seo }) => {
  const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl eu nisl. \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl eu nisl.'

  return (
    <AdminLayout seo={seo}>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} shadow={'md'} p={4}>
        <Caps
          imageParams={{
            title: 'Scale 1',
            text,
            shape: 1,
            randomImage: true,
            flip: true,
            bg: 'white',
            color: 'black',
            hasLine: true,
          }}
          hasRandomImage
        />
        <Caps
          imageParams={{
            title: 'Scale 0.5',
            text,
            shape: 2,
            randomImage: true,
            flip: true,
            bg: 'white',
            color: 'black',
            hasLine: true,
          }}
          hasRandomImage
        />
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
