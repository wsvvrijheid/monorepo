import { FC } from 'react'

import {
  Box,
  Center,
  Flex,
  Heading,
  Text,
  HStack,
  VStack,
  Image,
  Link,
} from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { i18nConfig } from '@wsvvrijheid/config'
import { Request } from '@wsvvrijheid/lib'
import { Platform, StrapiLocale } from '@wsvvrijheid/types'
import { AnimatedBox, Container } from '@wsvvrijheid/ui'

import { HomeAbout, HomeHero, HomePlatform, Layout } from '../components'

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

const Home: FC<HomeProps> = ({ seo, platforms }) => {
  const { t } = useTranslation()

  return (
    <Layout seo={seo}>
      <Flex
        flexDir="column"
        justify="space-between"
        minH="100vh"
        bg="gray.100"
        mt={{ base: '-64px', lg: -100 }}
        pt={100}
        pos="relative"
        zIndex={0}
      >
        <Container maxW="container.md" pos="relative" zIndex={1}>
          <AnimatedBox directing="to-down">
            <VStack flex={1} py={16} spacing={4} textAlign="center">
              <Heading fontWeight={900}>Wees de Stem voor Vrijheid</Heading>
              <Text fontSize="xl">{t('home.hero')}</Text>
            </VStack>
          </AnimatedBox>
        </Container>
        <Box overflow="hidden" mt={{ base: '-64px', lg: -100 }}>
          <AnimatedBox delay={4} duration={3} directing="to-up">
            <HomeHero />
          </AnimatedBox>
        </Box>
      </Flex>
      <Center bg="primary.100" py={{ base: 16, lg: 32 }} minH="100vh">
        <Container>
          <HomeAbout />
        </Container>
      </Center>
      <HomePlatform platforms={platforms?.data} />
      <Center py={{ base: 16, lg: 32 }} bg={'gray.100'}>
        <Container>
          <VStack spacing={8}>
            <Heading fontWeight={900}>{t('home.partners')}</Heading>
            <Link href="https://challenges.nl" isExternal>
              <HStack align={'center'}>
                <Image
                  alt={'Stichting Challenges'}
                  src="https://challenges.nl/wp-content/uploads/2022/12/challengeslogo-1.png"
                  w={150}
                />
                <Text fontSize="xl">Stichting Challenges</Text>
              </HStack>
            </Link>
          </VStack>
        </Container>
      </Center>
    </Layout>
  )
}

export default Home

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const platforms = await Request.collection<Platform>({
    url: 'api/platforms',
  })

  const title = {
    en: 'Homepage',
    tr: 'Anasayfa',
    nl: 'Home',
  }

  const description = {
    en: '',
    tr: '',
    nl: '',
  }

  const seo = {
    title: title[locale],
    description: description[locale],
  }

  return {
    props: {
      seo,
      platforms,
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
  }
}
