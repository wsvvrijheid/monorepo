import { FC } from 'react'

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale } from '@wsvvrijheid/types'
import { Container } from '@wsvvrijheid/ui'
import { FetchWithFilters } from '@wsvvrijheid/ui/src/examples/E3_FetchWithFilters'

import { Layout } from '../components'

type PrivacyProps = InferGetStaticPropsType<typeof getStaticProps>

const Privacy: FC<PrivacyProps> = ({ }) => {
  return (
    <Layout seo={{}} isDark>
      <Container>
        <FetchWithFilters initialValue={''}/>
      </Container>
    </Layout>
  )
}

export default Privacy

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale



  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
    revalidate: 1,
  }
}
