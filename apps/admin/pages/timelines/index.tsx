import { FC } from 'react'

import { useSearchModel } from '@wsvvrijheid/services'
import { Timeline } from '@wsvvrijheid/types'
import { AdminLayout, TimelineBoard } from '@wsvvrijheid/ui'
import { InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import i18nConfig from '../../next-i18next.config'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const Timelines: FC<PageProps> = ({ seo }) => {
  const { data: timelines, isLoading } = useSearchModel<Timeline>({
    url: 'api/timelines',
  })

  return (
    <AdminLayout seo={seo} isLoading={isLoading}>
      <TimelineBoard timelines={timelines?.data} />
    </AdminLayout>
  )
}

export const getStaticProps = async context => {
  const { locale } = context

  const title = {
    en: 'Timelines',
    tr: 'Timelines',
    nl: 'Timelines',
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
