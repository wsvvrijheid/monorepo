import { FC } from 'react'

import { Box, HStack, Heading, Spinner, Stack } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { serialize } from 'next-mdx-remote/serialize'

import { SITE_URL } from '@wsvvrijheid/config'
import { strapiRequest } from '@wsvvrijheid/lib'
import { getModelStaticPaths } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Presentation, StrapiLocale } from '@wsvvrijheid/types'
import { Container, Markdown, ShareButtons, WImage } from '@wsvvrijheid/ui'
import { getLocalizedSlugs } from '@wsvvrijheid/utils'

import { Layout } from '../../components/index'

type PresentationDetailPageProps = InferGetStaticPropsType<
  typeof getStaticProps
>

const PresentationDetailPage: FC<PresentationDetailPageProps> = ({
  seo,
  source,
  image,
}) => {
  const { locale, asPath } = useRouter()

  if (!source) return <Spinner />

  const URL = `${SITE_URL}/${locale}${asPath}`

  return (
    <Layout seo={seo}>
      <Container maxW="container.md">
        <Stack py={8} spacing={8}>
          <WImage ratio="twitter" src={image} rounded="lg" />
          <Heading textAlign="center">{seo.title}</Heading>
          <HStack justifyContent={'end'}>
            <ShareButtons
              url={URL}
              title={seo.title}
              quote={seo?.description || ''}
            />
          </HStack>
          <Box textAlign={{ base: 'left', lg: 'justify' }}>
            <Markdown source={source} />
          </Box>
        </Stack>
      </Container>
    </Layout>
  )
}
export default PresentationDetailPage

export const getStaticPaths = async () => {
  return await getModelStaticPaths('presentations')
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale
  const slug = context.params?.['slug'] as string

  const presentationData = await strapiRequest<Presentation>({
    endpoint: 'presentations',
    filters: { slug: { $eq: slug } },
    locale,
  })

  if (!presentationData?.data?.length) return { notFound: true }

  const presentation = presentationData.data[0]

  const slugs = getLocalizedSlugs(presentation, locale)

  const title = presentation.title || ''
  const description = presentation.description || ''
  const content = presentation.content || ''
  const image = presentation.image || ''

  const seo = { title, description }

  const source = await serialize(content || '')

  return {
    props: {
      seo,
      image,
      source,
      slugs,
      ...(await ssrTranslations(locale)),
    },
    revalidate: 1,
  }
}
