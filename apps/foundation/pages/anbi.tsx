import { FC } from 'react'

import {
  Box,
  Divider,
  HStack,
  Heading,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { NextSeoProps } from 'next-seo'

import { strapiRequest } from '@wsvvrijheid/lib'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Foundation, StrapiLocale } from '@wsvvrijheid/types'
import { Container, Hero } from '@wsvvrijheid/ui'

import { DirectorsCard, DocumentCard, FoundationDetailsCard, Layout } from '../components'


interface AnbiPageProps {
  seo: NextSeoProps
  foundationsData: Foundation[]
  title: string
}

const AnbiPage: FC<AnbiPageProps> = ({ seo, foundationsData, title }) => {
  const { t } = useTranslation()

  console.log('foundations', foundationsData?.data, 'Title:', title)

  const foundations = foundationsData?.data || []

  return (
    <Layout seo={seo} isDark>
      <Hero title={title} />
      <Box minH="inherit" fontWeight={500}>
        <Container minH="inherit">
          {foundations?.map(foundation => {
            return (
              <VStack
                key={foundation?.id}
                p={{ base: 8, lg: 12 }}
                align={{ base: 'center', lg: 'start' }}
              >
                {/*  foundation details*/}
                <Heading as="h3" size="lg" textAlign="center" fontWeight={900}>
                  {foundation?.name}
                </Heading>

                <HStack p={{ base: 8, lg: 12 }}>
                  <FoundationDetailsCard foundation={foundation} />
                </HStack>

                {/* directors */}
                <VStack align={{ base: 'center', lg: 'start' }}>
                  <Heading
                    as="h3"
                    size="lg"
                    textAlign="center"
                    fontWeight={900}
                  >
                    Directors
                  </Heading>
                  <HStack spacing={4} m={8}>
                    <DirectorsCard
                      label={'voorzitter'}
                      value={foundation?.charman?.name}
                    />
                    <DirectorsCard
                      label={'Secretaris'}
                      value={foundation?.secretary?.name}
                    />
                    <DirectorsCard
                      label={'Penningmeester'}
                      value={foundation?.accountant?.name}
                    />
                  </HStack>
                </VStack>
                {/* documents */}
                <HStack align={{ base: 'center', lg: 'start' }}>
                  <Wrap spacing={4} m={4}>
                    <DocumentCard
                      label={'Beleidplan'}
                      url={foundation?.policy_plan?.url}
                    />
                    <DocumentCard
                      label={' Inhoudelijk & financieel Jaarverslag'}
                      url={foundation?.substantive_financial_annual_report?.url}
                    />
                    <DocumentCard
                      label={'Beloningsbeid'}
                      url={foundation?.remuneration_policy?.url}
                    />
                  </Wrap>
                </HStack>
              </VStack>
            )
          })}
        </Container>
      </Box>
    </Layout>
  )
}

export default AnbiPage

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const foundationsData = await strapiRequest<Foundation>({
    endpoint: 'foundations',
    //  populate: ['charman', 'secretary', 'accountant','profiles'],
  })

  return {
    props: {
      ...(await ssrTranslations(locale)),
      foundationsData,
      title: 'ANBI',
    },
    revalidate: 1,
  }
}







