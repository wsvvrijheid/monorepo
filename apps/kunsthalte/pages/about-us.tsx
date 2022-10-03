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

    Sanata ilgi duyan Hollanda’ya göç etmiş kişilerin hem online hem fiziki olarak buluştuğu, birbirlerine tecrübelerini aktardığı, modern ve geleneksel sanatlar üzerine bilgi paylaşımı yaptıkları, aynı zamanda sanatsal aktiviteler organize ettikleri bir gruptur.
    
    ## Sanat Durağının amacı nedir?
    
    Vakfın kuruluş amaçları düşünüldüğünde, sanatın evrensel dili göz ardı edilemeyecek kadar büyük bir öneme sahiptir. Bu nedenle sanata değer verilmeli, sanata ilgi duyan kişiler bir araya getirilmeli ve bu alandaki yeteneklerini geliştirmek isteyenlere değişik fırsatlar sunulmalıdır. Sonuç olarak sanatın insan hakları ihlallerinin azalmasına veya son bulmasına katkı sağlaması amaçlanmaktadır.
    `,
    nl: `## Wie is Kunsthalte?

    Kunsthalte is een groep waar mensen die naar Nederland zijn geëmigreerd, geïnteresseerd zijn in kunst, elkaar online en fysiek ontmoeten, hun ervaringen met elkaar delen, informatie delen over moderne en traditionele kunst en tegelijkertijd artistieke activiteiten organiseren.
    
    ## Wat is het doel van de Kunsthalte?
    
    Gezien de oprichtingsdoelen van de stichting, heeft de universele taal van de kunst een groot belang dat niet kan worden genegeerd. Om deze reden moet kunst worden gewaardeerd, mensen die geïnteresseerd zijn in kunst moeten worden samengebracht en verschillende kansen moeten worden geboden aan degenen die hun vaardigheden op dit gebied willen verbeteren. Hierdoor is het de bedoeling dat kunst bijdraagt ​​aan het verminderen of beëindigen van mensenrechtenschendingen.`,
    en: `## Who is Art Stop?
    
    Art stop is a group where people who took emigrated in the Netherlands, who are interested in art, meet both online and physically, share their experiences with each other, share information on modern and traditional arts, and organize artistic activities at the same time.
    
    ## What is the purpose of the Art Stop?
    
    Considering the founding purposes of the foundation, the universal language of art has a great importance that cannot be ignored. For this reason, art should be valued, people interested in art should be brought together and different opportunities should be offered to those who want to improve their skills in this field. As a result, it is aimed that art will contribute to the reduction or end of human rights violations.`,
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
