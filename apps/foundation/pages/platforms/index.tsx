import { FC } from 'react'

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'

import { strapiRequest } from '@fc/lib'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { Platform, StrapiLocale } from '@fc/types'
import { Hero } from '@fc/ui'

import { HomePlatform, Layout } from '../../components'

type PlatformsProps = InferGetStaticPropsType<typeof getStaticProps>

const Platforms: FC<PlatformsProps> = ({ platforms }) => {
  const { t } = useTranslation()

  const title = t('platforms')

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
    endpoint: 'platforms',
  })

  return {
    props: {
      ...(await ssrTranslations(locale)),
      platforms,
    },
    revalidate: 1,
  }
}
