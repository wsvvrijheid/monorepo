import { FC } from 'react'

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
// import { useTranslation } from 'next-i18next'

import { strapiRequest } from '@wsvvrijheid/lib'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Presentation, StrapiLocale } from '@wsvvrijheid/types'

import { Layout } from '../components'

type PresentationsProps = InferGetStaticPropsType<typeof getStaticProps>

const PresentationPage: FC<PresentationsProps> = ({ presentations }) => {
  // const { t } = useTranslation()

  const title = 'Presentation'
  console.log('presentations', presentations.data)

  return <Layout seo={{ title }}>presentation</Layout>
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
