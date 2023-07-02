import { FC } from 'react'

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { strapiRequest } from '@wsvvrijheid/lib'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Platform, StrapiLocale } from '@wsvvrijheid/types'
import { Hero } from '@wsvvrijheid/ui'

import { HomePlatform, Layout } from '../../components'

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
  const locale = context.locale as StrapiLocale

  const platforms = await strapiRequest<Platform>({
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
      ...(await ssrTranslations(locale)),
      title: seo.title[locale],
      platforms,
    },
    revalidate: 1,
  }
}
