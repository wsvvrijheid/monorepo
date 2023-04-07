import { FC } from 'react'

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { searchModel } from '@wsvvrijheid/services'
import { Platform } from '@wsvvrijheid/types'
import { Hero } from '@wsvvrijheid/ui'

import { HomePlatform, Layout } from '../../components'
import i18nConfig from '../../next-i18next.config'

type PlatformsProps = InferGetStaticPropsType<typeof getStaticProps>

const Platforms: FC<PlatformsProps> = ({ title, platforms }) => {
  return (
    <Layout seo={{ title }} isDark>
      <Hero title={title} />

      <HomePlatform platforms={platforms?.data} />
    </Layout>
  )
}

export default Platforms

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { locale } = context

  const platforms = await searchModel<Platform>({
    url: 'api/platforms',
  })

  const seo = {
    title: {
      en: 'Platforms',
      nl: 'Platforms',
      tr: 'Platformlar',
    },
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
      title: seo.title[locale],
      platforms,
    },
  }
}
