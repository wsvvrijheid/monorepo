import { FC } from 'react'

import { Box, Button, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import { searchModel } from '@wsvvrijheid/services'
import { Hashtag, StrapiLocale } from '@wsvvrijheid/types'
import { Navigate } from '@wsvvrijheid/ui'
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
  hashtags: Hashtag[]
}

const Home: FC<HomeProps> = ({ seo, link, hashtags }) => {
  const { t } = useTranslation()
  console.log(hashtags)

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

          {/* Placeholder for HashtagCard */}
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            color="white"
            spacing={6}
            alignItems={{ base: 'center', lg: 'center' }}
            justifyContent={'space-between'}
          >
            <VStack
              alignItems={{ base: 'center', sm: 'flex-start' }}
              spacing={6}
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
                Daha fazla oku
              </Button>
            </VStack>
            <Box
              bg={'gray'}
              borderRadius={12}
              border={'1px'}
              borderColor={'white'}
              width={600}
              height={60}
            ></Box>
          </Stack>
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
  const link = getItemLink(hashtags?.data?.[0], locale, 'hashtag')

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
