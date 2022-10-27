import { FC } from 'react'

import { Request } from '@wsvvrijheid/lib'
import { getVolunteers } from '@wsvvrijheid/services'
import { VolunteersTemplate, VolunteersTemplateProps } from '@wsvvrijheid/ui'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { Layout } from '../components'
import i18nConfig from '../next-i18next.config'

const VolunteersPage: FC<VolunteersTemplateProps & { seo: NextSeoProps }> = ({
  seo,
  volunteers,
  jobs,
}) => {
  return (
    <Layout seo={seo} isDark>
      <VolunteersTemplate seo={seo} volunteers={volunteers} jobs={jobs} />
    </Layout>
  )
}
export default VolunteersPage

export const getStaticProps: GetStaticProps = async context => {
  const volunteersResponse = await getVolunteers()
  const jobsResponse = await Request.collection({ url: 'api/jobs' })

  const title = {
    en: 'Volunteers',
    nl: 'Vrijwillegers',
    tr: 'Gönüllüler',
  }

  const seo = {
    title: title[context.locale],
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common'], i18nConfig)),
      volunteers: volunteersResponse,
      jobs: jobsResponse?.data,
      seo,
    },
    revalidate: 1,
  }
}
