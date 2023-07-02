import { FC } from 'react'

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { NextSeoProps } from 'next-seo'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale, Timeline } from '@wsvvrijheid/types'
import { AdminLayout, TimelineBoard } from '@wsvvrijheid/ui'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const Timelines: FC<PageProps> = ({ seo }) => {
  const { locale } = useRouter()

  const { data: timelines, isLoading } = useStrapiRequest<Timeline>({
    url: 'api/timelines',
    locale,
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
      ...(await ssrTranslations(locale, ['admin'])),
    },
  }
}

export default Timelines
