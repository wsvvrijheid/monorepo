import { FC } from 'react'

import { SimpleGrid } from '@chakra-ui/react'
import { getAllPlatforms } from '@wsvvrijheid/services'
import { Platform } from '@wsvvrijheid/types'
import { AnimatedBox, Container, Hero, Card } from '@wsvvrijheid/ui'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

import { Layout } from '../../components'
import i18nConfig from '../../next-i18next.config'

type PlatformsProps = {
  title: string
  platforms: Platform[]
}

const Platforms: FC<PlatformsProps> = ({ title, platforms }) => {
  const { locale } = useRouter()

  return (
    <Layout seo={{ title }} isDark>
      <Hero title={title} />
      <Container centerContent>
        <SimpleGrid
          alignContent="stretch"
          columns={{ base: 1, md: 2, lg: 4 }}
          gap={{ base: 6, lg: 8 }}
          my={16}
        >
          {platforms.map((project, i) => (
            <AnimatedBox key={project.id} delay={i * 3} directing="to-down">
              <Card
                title={project[`name_${locale}`]}
                description={project[`description_${locale}`]}
                image={project.image?.url}
                link={`/${locale}/platforms/${project.slug}`}
                rounded
              />
            </AnimatedBox>
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export default Platforms

export const getStaticProps = async context => {
  const { locale } = context

  const platforms = await getAllPlatforms()

  const seo = {
    title: {
      en: 'Platforms',
      nl: 'Platforms',
      tr: 'Platformlar',
    },
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
      title: seo.title[locale],
      platforms,
    },
  }
}
