import { Term } from '@wsvvrijheid/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'

import { Container, Hero, Markdown } from '../../../libs/ui/src'
import { request } from '../../../libs/utils/src'
import { truncateText } from '../../../libs/utils/src'
import { Layout } from '../components'

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

  const data = await request()<Term>({ url: 'api/term' })

  if (!data.data)
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
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
