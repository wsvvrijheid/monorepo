import { GetStaticPropsContext } from 'next'

import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale } from '@wsvvrijheid/types'
import { Container } from '@wsvvrijheid/ui'
import { ResponsiveCardExample } from '@wsvvrijheid/ui/src/examples/ResponsiveCard/ResponsiveCardExample'

import { Layout } from '../components'


const Test = () => {


  return (
    <Layout seo={{title: "Test"}}>
      <Container>
        <ResponsiveCardExample />
      </Container>
    </Layout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale


  return {
    props: {
     // We pass this in order to be able to use translations in the page and its components
      ...(await ssrTranslations(locale)),
    }
  }
}

export default Test