import { FC } from 'react'

import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import { searchModel } from '@wsvvrijheid/services'
import { Hashtag, StrapiLocale, StrapiMeta } from '@wsvvrijheid/types'
import { Navigate, Container } from '@wsvvrijheid/ui'
import { getItemLink } from '@wsvvrijheid/utils'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { Layout } from '../components'
import { HashtagsSummary } from '../components/HashtagsSummary/HashtagsSummary'
import i18nConfig from '../next-i18next.config'

export type SearchedHashtags = {
  data: Hashtag[]
  meta: StrapiMeta
}

interface HomeProps {
  seo: NextSeoProps
  link: string
  hashtags: SearchedHashtags
  links: string[]
}

const Home: FC<HomeProps> = ({ seo, link, hashtags, links }) => {
  const { t } = useTranslation()

  return (
    <Layout seo={seo} isDark hasScroll>
      <Box
        bgGradient="linear(to-b, primary.600, primary.300)"
        mt={{ base: '-64px', lg: '-100px' }}
        pb={{ base: 16, lg: 32 }}
      >
        <Container>
          <Stack
            color="white"
            spacing={6}
            alignItems={{ base: 'center', lg: 'center' }}
            justifyContent={'center'}
            textAlign={{ base: 'center', lg: 'center' }}
            h={'100vh'}
          >
            <Heading as="h3" size="xl" color="white">
              {t('home.post-maker.title')}
            </Heading>
            <Text fontSize="xl" fontWeight="normal" maxWidth="2xl">
              {t('home.post-maker.content')}
            </Text>

            <Button
              as={Navigate}
              href={link || '/'}
              size={'lg'}
              fontWeight="semibold"
              variant="solid"
              colorScheme="primary"
              bg="white"
              color="primary.500"
              boxShadow="lg"
              whiteSpace="normal"
              _hover={{ color: 'white', bg: 'blackAlpha.100' }}
              py={'4'}
              h={'auto'}
            >
              {t('home.post-maker.button')}
            </Button>
          </Stack>
        </Container>
      </Box>
      {hashtags && <HashtagsSummary hashtags={hashtags} />}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const locale = context.locale as StrapiLocale

  const title: Record<string, string> = {
    en: 'Home',
    nl: 'Home',
    tr: 'Anasayfa',
  }

  const hashtags = await searchModel<Hashtag>({
    url: 'api/hashtags',
    locale,
    statuses: ['approved'],
    pageSize: 4,
  })

  const latestHashtag = hashtags?.data?.[0] || null

  const link = getItemLink(latestHashtag, locale, 'hashtag')

  const seo: NextSeoProps = {
    title: title[locale],
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
      link,
      seo,
      hashtags,
    },
    revalidate: 1,
  }
}

export default Home
