import { Button, Center, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { BsCollectionFill } from 'react-icons/bs'
import { FaPaintBrush } from 'react-icons/fa'

import { ASSETS_URL } from '@wsvvrijheid/config'
import { AnimatedBox, Container, Navigate } from '@wsvvrijheid/ui'

import { Layout } from '../components'
import i18nConfig from '../next-i18next.config'

export default function Home({ seo }) {
  const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <Layout seo={seo}>
      <Center
        minH="100vh"
        bg="gray.100"
        mt={{ base: '-64px', lg: '-100px' }}
        pt={100}
        pos="relative"
        zIndex={0}
        backgroundImage={`url(${ASSETS_URL}/uploads/kunsthalte_home_bg_79d33962e7_95c9ce377d.jpg)`}
        backgroundSize="cover"
      >
        <Container
          maxW="container.md"
          pos="relative"
          zIndex={1}
          transform={{ base: 'translateY(-50px)', lg: 'translateY(-120px)' }}
        >
          <AnimatedBox directing="to-down">
            <VStack flex={1} py={16} spacing={4} textAlign="center">
              <Heading fontWeight={900}>{t('art-station')}</Heading>
              <Text fontSize={{ base: 'md', lg: 'xl' }}>
                &quot;<>{t('footer-about.kunsthalte')}</>&quot;
              </Text>
            </VStack>
          </AnimatedBox>
          <AnimatedBox directing="to-down" mx="auto">
            <Stack
              justify="center"
              direction={{ base: 'column', lg: 'row' }}
              spacing={4}
            >
              <Button
                as={Navigate}
                href={`/${locale}/club/arts`}
                size="lg"
                leftIcon={<FaPaintBrush />}
              >
                {t('view-arts')}
              </Button>

              <Button
                as={Navigate}
                href={`/${locale}/club/collections`}
                size="lg"
                leftIcon={<BsCollectionFill />}
              >
                {t('view-collections')}
              </Button>
            </Stack>
          </AnimatedBox>
        </Container>
      </Center>
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
