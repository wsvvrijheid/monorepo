import { FC } from 'react'

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
// import { useTranslation } from 'next-i18next'

import { strapiRequest } from '@wsvvrijheid/lib'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Presentation, StrapiLocale } from '@wsvvrijheid/types'
import { Hero, PresentationTemplate } from '@wsvvrijheid/ui'

import { Layout } from '../components'

type PresentationsProps = InferGetStaticPropsType<typeof getStaticProps>

const PresentationPage: FC<PresentationsProps> = ({ presentations }) => {
  // const { t } = useTranslation()
  const title = 'Presentation'

  return (
    <Layout seo={{ title }}>
      <Hero title={title} />
      <PresentationTemplate presentations={presentations?.data} />
    </Layout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale
  const presentations = await strapiRequest<Presentation>({
    endpoint: 'presentations',
  })

  return {
    props: {
      ...(await ssrTranslations(locale)),
      presentations,
    },
    revalidate: 1,
  }
}

export default PresentationPage
