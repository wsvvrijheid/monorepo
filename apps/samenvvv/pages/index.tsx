import { FC } from 'react'

import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import { searchModel } from '@wsvvrijheid/services'
import { Hashtag, StrapiLocale } from '@wsvvrijheid/types'
import { Navigate, WImage } from '@wsvvrijheid/ui'
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
  hashtag: Hashtag
}

const Home: FC<HomeProps> = ({ seo, link, hashtag }) => {
  const { t } = useTranslation()

  return (
    <Layout seo={seo} isDark hasScroll>
      <Box pos="relative" bg="white" mt="-100px">
        <Stack
          p={8}
          bgGradient="linear(to-b, primary.600, primary.300)"
          shadow="primary"
          rounded="sm"
          minH="100vh"
          alignItems={'center'}
        >
          <Stack
            color="white"
            spacing={6}
            alignItems={{ base: 'center', lg: 'center' }}
            justifyContent={'center'}
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
              size={{ base: 'sm', md: 'lg' }}
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

          {hashtag && (
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              color="white"
              spacing={6}
              alignItems={'stretch'}
              justifyContent={'space-between'}
            >
              <Stack
                py={2}
                justifyContent={'space-between'}
                alignItems={{ base: 'center', sm: 'flex-start' }}
              >
                <Heading as="h3" size="xl" color="white">
                  {hashtag.title}
                </Heading>
                <Text fontSize="xl" fontWeight="normal" maxWidth="2xl">
                  {hashtag.description}
                </Text>
                <Button
                  as={Navigate}
                  href={link || '/'}
                  size={{ base: 'sm', md: 'lg' }}
                  fontWeight="semibold"
                  variant="solid"
                  colorScheme="primary.600"
                  bg="white"
                  color="primary.500"
                  boxShadow="lg"
                  _hover={{ color: 'white', bg: 'blackAlpha.100' }}
                >
                  {t('read-more')}
                </Button>
              </Stack>
              <WImage
                width={480}
                height={270}
                borderRadius={'xl'}
                border={'1px'}
                borderColor={'white'}
                objectFit="fill"
                src={hashtag.image}
              />
            </Stack>
          )}
        </Stack>
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
  const hashtag = hashtags?.data?.[0] || null

  const link = getItemLink(hashtag, locale, 'hashtag')

  const seo: NextSeoProps = {
    title: title[locale],
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
      link,
      seo,
      hashtag,
    },
    revalidate: 1,
  }
}

export default Home
