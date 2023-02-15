import { FC } from 'react'

import {
  Box,
  Center,
  Flex,
  Heading,
  Text,
  VStack,
  Link,
} from '@chakra-ui/react'
import { searchModel } from '@wsvvrijheid/services'
import { Platform } from '@wsvvrijheid/types'
import { AnimatedBox, Container, WImage } from '@wsvvrijheid/ui'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { HomeAbout, HomeHero, HomePlatform, Layout } from '../components'
import i18nConfig from '../next-i18next.config'

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
              <Heading fontWeight="black">Wees de Stem voor Vrijheid</Heading>
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
      <Center bg="blue.100" py={{ base: 16, lg: 32 }} minH="50vh">
        <Container>
          <HomeAbout />
        </Container>
      </Center>
      <HomePlatform platforms={platforms?.data} />
      <Center bg="blue.100" py={{ base: 16, lg: 32 }} minH="50vh">
        <Container>
          {/* <Heading fontWeight="black">{t('home.partners')}</Heading> */}
          <Heading fontWeight="black">Partners</Heading>
          <Text fontSize="xl">Stichting Challenges</Text>
          <Box flex={1} h="full" w="full">
            <Link href="https://challenges.nl" isExternal>
              <WImage
                src="https://challenges.nl/wp-content/uploads/2022/12/challengeslogo-1.png"
                boxSize={250}
                overflow="hidden"
              />
            </Link>
          </Box>
        </Container>
      </Center>
    </Layout>
  )
}

export default Home

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { locale } = context

  const platforms = await searchModel<Platform>({
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
