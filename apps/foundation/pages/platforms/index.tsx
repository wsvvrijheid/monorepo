import { SimpleGrid } from '@chakra-ui/react'
import { AnimatedBox, Container, Hero, Card } from '@wsvvrijheid/ui'
import { request } from '@wsvvrijheid/utils'
import i18nConfig from 'apps/foundation/next-i18next.config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

import { Layout } from '../../components'

export default function Projects({ title, projects }) {
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
          {projects?.data.map((project, i) => (
            <AnimatedBox key={project.id} delay={i * 3} directing="to-down">
              <Card
                title={project[`name_${locale}`]}
                description={project[`description_${locale}`]}
                image={project.image.url}
                link={`/${locale}/platforms/${project.code}`}
                rounded
              />
            </AnimatedBox>
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  )
}
export const getStaticProps = async context => {
  const { locale } = context

  const projects = await request({ url: 'api/projects' })

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
      // platform,
    },
  }
}
