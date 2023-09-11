import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale, Timeline } from '@wsvvrijheid/types'
import { AdminLayout, TimelineBoard } from '@wsvvrijheid/ui'

const Timelines = () => {
  const { locale } = useRouter()
  const { t: tAdmin } = useTranslation('admin')

  const { data: timelines, isLoading } = useStrapiRequest<Timeline>({
    endpoint: 'timelines',
    locale,
  })

  return (
    <AdminLayout seo={{ title: tAdmin('timelines') }} isLoading={isLoading}>
      {timelines?.data && <TimelineBoard timelines={timelines?.data} />}
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale, ['admin', 'model'])),
    },
  }
}

export default Timelines
