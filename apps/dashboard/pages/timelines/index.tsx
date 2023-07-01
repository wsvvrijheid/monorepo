import { FC } from 'react'

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import i18nConfig from '@wsvvrijheid/config/next-i18next.config'
import { useSearchModel } from '@wsvvrijheid/services'
import { StrapiLocale, Timeline } from '@wsvvrijheid/types'
import { AdminLayout, TimelineBoard } from '@wsvvrijheid/ui'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const Timelines: FC<PageProps> = ({ seo }) => {
  const { locale } = useRouter()

  const { data: timelines, isLoading } = useSearchModel<Timeline>({
    url: 'api/timelines',
    locale: locale as StrapiLocale,
  })

  return (
    <AdminLayout seo={seo} isLoading={isLoading}>
      {timelines?.data && <TimelineBoard timelines={timelines?.data} />}
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const title = {
    en: 'Timelines',
    tr: 'Timelinelar',
    nl: 'Tijdlijnen',
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

export default Timelines
