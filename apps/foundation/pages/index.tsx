import { Box, Center, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import { AnimatedBox, Container } from '@wsvvrijheid/ui'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { HomeAbout } from '../components/HomeAbout'
import { HomeHero } from '../components/HomeHero/HomeHero'
import { HomeProject } from '../components/HomeProject/HomeProject'
import { Layout } from '../components/Layout/Layout'
import i18nConfig from '../next-i18next.config'

export default function Home({ seo }) {
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
              <Text fontSize="xl">{t`home.hero`}</Text>
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
      <HomeProject />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const { locale } = context

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
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
  }
}
