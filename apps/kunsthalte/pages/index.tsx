import {
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { AnimatedBox, Container, Navigate } from '@wsvvrijheid/ui'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { BsCollectionFill } from 'react-icons/bs'
import { FaPaintBrush } from 'react-icons/fa'

import { Layout } from '../components'
import i18nConfig from '../next-i18next.config'

export default function Home({ seo }) {
  const { t } = useTranslation(['common'])
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
        backgroundImage="url(https://api.samenvvv.nl/uploads/kunsthalte_home_bg_79d33962e7.jpg)"
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
              <Heading fontWeight="black">{t`art-station`}</Heading>
              <Text fontSize={{ base: 'md', lg: 'xl' }}>
                &quot;{t('footer-about.kunsthalte')}&quot;
              </Text>
            </VStack>
          </AnimatedBox>
          <AnimatedBox directing="to-down" mx="auto">
            <Stack
              justify="center"
              direction={{ base: 'column', lg: 'row' }}
              spacing={4}
            >
              <Navigate
                size="lg"
                href={`/${locale}/club/arts`}
                as={Button}
                leftIcon={<FaPaintBrush />}
                colorScheme="primary"
              >
                <Box>{t('view-arts')}</Box>
              </Navigate>
              <Navigate
                size="lg"
                href={`/${locale}/club/collections`}
                as={Button}
                leftIcon={<BsCollectionFill />}
                colorScheme="primary"
              >
                {t('view-collections')}
              </Navigate>
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
