import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useStrapiRequest } from '@fc/services'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { StrapiLocale, Timeline } from '@fc/types'
import { AdminLayout, TimelineBoard } from '@fc/ui'

const Timelines = () => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  const { data: timelines, isLoading } = useStrapiRequest<Timeline>({
    endpoint: 'timelines',
    locale,
  })

  return (
    <AdminLayout seo={{ title: t('timelines') }} isLoading={isLoading}>
      {timelines?.data && <TimelineBoard timelines={timelines?.data} />}
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}

export default Timelines
