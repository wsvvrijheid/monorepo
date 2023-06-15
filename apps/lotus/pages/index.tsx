import { FC } from 'react'

import { Button, Heading, Image, VStack } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { StrapiLocale } from '@wsvvrijheid/types'
import { Container } from '@wsvvrijheid/ui'

import { Layout } from '../components'
import i18nConfig from '../next-i18next.config'

interface HomeProps {
  seo: NextSeoProps
}

const Home: FC<HomeProps> = ({ seo }) => {
  const { t } = useTranslation()

  return (
    <Layout seo={seo}>
      <Container>
        <VStack>
          <Image boxSize={300} src={'/images/lotus-logo.svg'} alt={'lotus'} />
          <Heading
            fontFamily={'lotus'}
            fontWeight={400}
            fontSize={'7xl'}
            color={'lotus.500'}
          >
            Lotus vd Media
          </Heading>
          <Button size={'lg'} as={Link} href={'/donation'} variant={'outline'}>
            {t('donation.title')}
          </Button>
        </VStack>
      </Container>
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

  return {
    props: {
      seo: { title: title[locale] },
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
    revalidate: 1,
  }
}

export default Home
