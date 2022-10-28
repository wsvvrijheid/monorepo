import { FC } from 'react'

import { Request } from '@wsvvrijheid/lib'
import { Term } from '@wsvvrijheid/types'
import { Container, Hero, Markdown } from '@wsvvrijheid/ui'
import { truncateText } from '@wsvvrijheid/utils'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'

import { Layout } from '../components'
import i18nConfig from '../next-i18next.config'

type TermsProps = {
  seo: NextSeoProps
  terms: Term
  source: MDXRemoteSerializeResult
}

const Terms: FC<TermsProps> = ({ terms, seo, source }) => {
  return (
    <Layout seo={seo} isDark>
      <Hero title={terms.title} isFullHeight={false} />
      <Container>
        <Markdown source={source} />
      </Container>
    </Layout>
  )
}

export default Terms

export const getStaticProps = async context => {
  const { locale } = context

  const response = await Request.single<Term>({
    url: 'api/term',
    locale,
  })

  const terms = response.data

  if (!terms) {
    return {
      notFound: true,
    }
  }

  const source = await serialize(terms.content || '')

  const seo = {
    title: terms.title,
    description: truncateText(terms.content || '', 200),
  }

  return {
    props: {
      terms,
      source,
      seo,
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
  }
}
