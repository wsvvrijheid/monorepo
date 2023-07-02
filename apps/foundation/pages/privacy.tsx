import { FC } from 'react'

import { truncate } from 'lodash'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { serialize } from 'next-mdx-remote/serialize'

import { i18nConfig } from '@wsvvrijheid/config'
import { strapiRequest } from '@wsvvrijheid/lib'
import { Privacy, StrapiLocale } from '@wsvvrijheid/types'
import { Container, Hero, Markdown } from '@wsvvrijheid/ui'

import { Layout } from '../components'

type PrivacyProps = InferGetStaticPropsType<typeof getStaticProps>

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

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const response = await strapiRequest<Privacy>({
    url: 'api/privacy',
    locale,
  })

  const privacy = response?.data

  if (!privacy) {
    return {
      notFound: true,
    }
  }

  const source = await serialize(privacy.content || '')

  const seo = {
    title: privacy.title,
    description: truncate(privacy.content || '', { length: 200 }),
  }

  return {
    props: {
      privacy,
      source,
      seo,
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
    revalidate: 1,
  }
}
