import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import {
  Container,
  Hero,
  Markdown,
  PlatformTemplateProps,
} from '@wsvvrijheid/ui'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { serialize } from 'next-mdx-remote/serialize'

import { Layout } from '../components'
import i18nConfig from '../next-i18next.config'

const AboutUsPage: FC<PlatformTemplateProps> = ({ seo, source }) => {
  if (!source) return null

  return (
    <Layout seo={seo} isDark>
      <Hero title={seo.title} />
      <Container maxW="container.lg">
        <Box textAlign="center" my={16}>
          <Markdown source={source} />
        </Box>
      </Container>
    </Layout>
  )
}
export default AboutUsPage

export const getStaticProps: GetStaticProps = async context => {
  const { locale } = context

  const markdown = {
    tr: `## Sanat Durağı Kimdir?

    Sanata ilgi duyan Hollanda’ya göç etmiş kişilerin hem online hem fiziki olarak buluştuğu, modern ve geleneksel sanatlar üzerine bilgi paylaşımı yaptıkları, aynı zamanda sanatsal aktiviteler organize ettikleri bir gruptur.
    
    ## Sanat Durağının amacı nedir?
    
    Günümüzde sanatın evrensel dili büyük bir güce ve öneme sahiptir. Bizler sanata değer verilmesi gerektiğine; sanata ilgi duyan kişiler olarak, bu alandaki yeteneklerini geliştirmek isteyenleri bir araya getirerek, onlara çeşitli fırsatlar sunulması gerektiğine inanıyoruz. Dünyaya dair meselelere sanat merceği altında bakıp, sanat dili ile farkındalık oluşturmak en birincil amacımız.
    `,
    nl: `## Wie is Kunsthalte?

    Het is een groep waar immigranten met een interesse in kunst samenkomen, zowel persoonlijk als online, kennis uitwisselen over moderne en traditionele kunst en tegelijkertijd artistieke evenementen plannen.
    
    ## Wat is het doel van de Kunsthalte?

    De universele taal van de kunst heeft tegenwoordig veel invloed. Als mensen die geïnteresseerd zijn in kunst, zijn wij van mening dat kunst gewaardeerd moet worden en dat degenen die hun vaardigheden op dit gebied willen vergroten, toegang moeten hebben tot een verscheidenheid aan opties. Ons belangrijkste doel is om mondiale problemen te bekijken door de lens van kunst en het bewustzijn te vergroten met de taal van kunst.`,
    en: `## Who is Art Station?
    
    It is a group where immigrants with an interest in the arts come together both in person and online, exchange knowledge about modern and traditional arts, and plan artistic events at the same time.
    
    ## What is the purpose of the Art Station?
    
    The universal language of art has a lot of influence today. As people who are interested in art, we think that it should be valued and that those who want to advance their skills in this area should have access to a variety of options. Our main objective is to look at the global issues through the lens of art and to raise awareness with the language of art.`,
  }

  const source = await serialize(markdown[locale])

  const seo = {
    en: {
      title: 'About Us',
    },
    nl: {
      title: 'Over ons',
    },
    tr: {
      title: 'Hakkımızda',
    },
  }

  return {
    props: {
      source,
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
      seo: seo[locale],
    },
    revalidate: 1,
  }
}
