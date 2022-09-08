import { FC } from 'react'

import { StrapiResponse, Privacy } from '@wsvvrijheid/types'
import { Container, Hero, Markdown } from '@wsvvrijheid/ui'
import { fetcher, truncateText } from '@wsvvrijheid/utils'
import { AxiosResponse } from 'axios'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'

import { Layout } from '../components'
import i18nConfig from '../next-i18next.config'

type PrivacyProps = {
  seo: NextSeoProps
  privacy: Privacy
  source: MDXRemoteSerializeResult
}

const Privacy: FC<PrivacyProps> = ({ privacy, seo, source }) => {
  return (
    <Layout seo={seo} isDark>
      <Hero title={privacy.title} isFullHeight={false} />
      <Container>
        <Markdown source={source} />
      </Container>
    </Layout>
  )
}

export default Privacy

export const getStaticProps = async context => {
  const { locale } = context

  // `request` returns null for SinglePages
  // probably because of some default parameters
  // like filter, populate, etc.
  const response = (await fetcher()(
    `api/privacy?locale=${locale}`,
  )) as AxiosResponse<StrapiResponse<Privacy>>

  const privacy = response?.data?.data
  console.log(privacy)

  if (!privacy) {
    return {
      notFound: true,
    }
  }

  const source = await serialize(privacy.content || '')

  const seo = {
    title: privacy.title,
    description: truncateText(privacy.content || '', 200),
  }

  return {
    props: {
      privacy,
      source,
      seo,
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
  }
}
