import { Term } from '@wsvvrijheid/types'
import { Container, Hero, Markdown } from '@wsvvrijheid/ui'
import { request } from '@wsvvrijheid/utils'
import { truncateText } from '@wsvvrijheid/utils'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'

import { Layout } from '../components'
import i18nConfig from '../next-i18next.config'

type TermsProps = {
  seo: NextSeoProps
  term: { [key: string]: string }
  source: MDXRemoteSerializeResult
}

const Terms = ({ term, seo, source }: TermsProps): JSX.Element => {
  return (
    <Layout seo={seo} isDark>
      <Hero title={term.title} isFullHeight={false} />
      <Container>
        <Markdown source={source} />
      </Container>
    </Layout>
  )
}

export default Terms

export const getStaticProps = async context => {
  const { locale } = context

  const data = await request()<Term>({ url: 'api/terms' })

  if (!data?.data)
    return {
      notFound: true,
    }

  const source = await serialize(data.data.content ?? '')

  const seo = {
    title: data.data?.title,
    description: truncateText(data.data?.content || '', 200),
  }

  return {
    props: {
      term: data.data,
      source,
      seo,
      ...(await serverSideTranslations(locale, ['common']), i18nConfig),
    },
  }
}
