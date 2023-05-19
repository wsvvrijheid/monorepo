import { FC } from 'react'

import { Box, Heading, Stack } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

import { ASSETS_URL } from '@wsvvrijheid/config'
import { Container, Hero, Markdown } from '@wsvvrijheid/ui'

import { Layout } from '../../../components'
import i18nConfig from '../../../next-i18next.config'

export type SoftwareProps = {
  source: MDXRemoteSerializeResult
  title: string
}

const SoftwarePage: FC<SoftwareProps> = ({ title, source }) => {
  return (
    <Layout seo={{ title }} isDark>
      <Hero image={`${ASSETS_URL}/uploads/software_card_f3408ac222.jpeg`} />
      <Container>
        <Stack mb={4}>
          <Box>
            <Heading pt={8} pb={5} as="h1" fontSize="4xl" textAlign="center">
              {title}
            </Heading>
          </Box>
          <Box>
            <Markdown source={source} />
          </Box>
        </Stack>
      </Container>
    </Layout>
  )
}

export default SoftwarePage

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { locale } = context

  const content = {
    en: 'With the developing technology, the biggest need is software. The more effectively you can use the software, the more successful you will be in fulfilling your goals. For these purposes, we have established a software team consisting of our volunteer software developers. They selflessly support us. Below you will see the software projects produced by our foundation and those who contributed to it. <br/>We use technologies such as javascript, react, next.js, strapi, chakra-ui in our software projects. If you have received basic education in these areas and want to gain experience, we welcome you to our team.',
    nl: 'Met de zich ontwikkelende technologie is software de grootste behoefte. Hoe effectiever u de software kunt gebruiken, hoe succesvoller u zult zijn in het bereiken van uw doelen. Voor deze doeleinden hebben we een softwareteam opgericht dat bestaat uit onze vrijwillige softwareontwikkelaars. Ze steunen ons belangeloos. Hieronder ziet u de softwareprojecten die door onze stichting zijn geproduceerd en degenen die hieraan hebben bijgedragen. <br/>We gebruiken technologieën zoals javascript, react, next.js, strapi, chakra-ui in onze softwareprojecten. Heb je een basisopleiding genoten op deze gebieden en wil je ervaring opdoen, dan heten we je van harte welkom in ons team.',

    tr: 'Gelişen teknolojiyle birlikte en büyük ihtiyaç yazılım olmaktadır. Yazılımdan ne kadar etkin bir şekilde faydalanabilirseniz amaçlarınızı yerine getirmede de o kadar başarılı olursunuz. Biz de bu amaçlarla gönüllü yazılımcılarımızdan oluşan yazılım ekibi kurduk. Kendileri fedakarca bize destek olmaktadırlar. Aşağıda vakfımız bünyesinde üretilen yazılım projelerini ve buna katkı verenleri göreceksiniz. <br/>Yazılım projelerimizde javascript, react, next.js, strapi, chakra-ui gibi teknolojileri kullanmaktayız. Eğer bu alanlarda temel seviyede eğitim aldınız ve tecrübe kazanmak istiyorsanız ekibimize bekleriz.',
  }

  const source = await serialize(content[locale])

  const seo = {
    title: {
      en: 'Software',
      nl: 'Software',
      tr: 'Yazılım',
    },
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
      title: seo.title[locale],
      source,
    },
    revalidate: 1,
  }
}
