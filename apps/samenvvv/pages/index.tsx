import { FC } from 'react'

import { Box, Button, Center, Heading, Stack, Text } from '@chakra-ui/react'
import { searchModel } from '@wsvvrijheid/services'
import { Hashtag, StrapiLocale } from '@wsvvrijheid/types'
import { Container, Navigate } from '@wsvvrijheid/ui'
import { getItemLink } from '@wsvvrijheid/utils'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { Layout } from '../components'
import i18nConfig from '../next-i18next.config'

interface HomeProps {
  seo: NextSeoProps
  link: string
}

const Home: FC<HomeProps> = ({ seo, link }) => {
  const { t } = useTranslation()

  return (
    <Layout seo={seo} isDark hasScroll>
      <Box pos="relative" bg="white" mt="-100px">
        <Center
          p={8}
          bgGradient="linear(to-b, primary.600, primary.300)"
          shadow="primary"
          rounded="sm"
          minH="100vh"
        >
          <Container>
            <Stack
              direction={{ base: 'column', lg: 'row' }}
              alignItems="center"
              spacing={4}
            >
              <Stack
                order={{ base: 2, lg: 1 }}
                color="white"
                spacing={6}
                alignItems={{ base: 'center', lg: 'center' }}
                flex={1}
                textAlign={{ base: 'center', lg: 'center' }}
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
                  size="lg"
                  fontWeight="semibold"
                  variant="solid"
                  colorScheme="primary.600"
                  bg="white"
                  color="primary.500"
                  boxShadow="lg"
                  _hover={{ color: 'white', bg: 'blackAlpha.100' }}
                >
                  {t('home.post-maker.button')}
                </Button>
              </Stack>

              {/* <PostMakerIcon
                order={{ base: 1, lg: 2 }}
                boxSize={{ base: 300, lg: 500 }}
              /> */}
            </Stack>
          </Container>
        </Center>
      </Box>
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
  })
  const link = getItemLink(hashtags?.data?.[0], locale, 'hashtag')

  const seo: NextSeoProps = {
    title: title[locale],
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
      link,
      seo,
    },
    revalidate: 1,
  }
}

export default Home
