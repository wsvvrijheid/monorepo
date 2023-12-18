import { FC } from 'react'

import {
  Box,
  Button,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Wrap,
} from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { GrDocumentDownload } from 'react-icons/gr'

import { API_URL } from '@wsvvrijheid/config'
import { strapiRequest } from '@wsvvrijheid/lib'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Foundation, StrapiLocale } from '@wsvvrijheid/types'
import { Container, Hero } from '@wsvvrijheid/ui'

import { DirectorsCard, FoundationDetails, Layout } from '../components'

type AnbiPageProps = InferGetStaticPropsType<typeof getStaticProps>

const AnbiPage: FC<AnbiPageProps> = ({ foundation }) => {
  const { t } = useTranslation()

  const title = 'ANBI'

  const formatName = (fullName: string) => {
    const nameParts = fullName.split(' ')
    const initials = nameParts[0].charAt(0) + '.'
    const lastName = nameParts.slice(1).join(' ')
    const formattedName = `${initials} ${lastName}`

    return formattedName
  }

  // formatted names
  const chairmanName = formatName(foundation?.chairman?.name || ' ')
  const secretaryName = formatName(foundation?.secretary?.name || ' ')
  const accountantName = formatName(foundation?.accountant?.name || ' ')
 
  return (
    <Layout seo={{ title }} isDark>
      <Hero title={title} />
      <Box minH="inherit" fontWeight={500}>
        <Container minH="inherit" py={{ base: 8, lg: 16 }}>
          <Stack spacing={16} textAlign={'center'}>
            {/*  foundation details*/}
            <Stack spacing={4}>
              <Heading as="h3" size="lg" fontWeight={700}>
                {foundation?.name}
              </Heading>

              <FoundationDetails foundation={foundation} />
            </Stack>

            {/* directors */}
            <Stack spacing={4}>
              <Heading as="h3" size="lg" fontWeight={700}>
                {t('wsvvrijheid.management')}
              </Heading>
              <SimpleGrid gap={4} columns={{ base: 1, lg: 3 }} w={'full'}>
                {chairmanName && (
                  <DirectorsCard
                    title={t('wsvvrijheid.chairman')}
                    name={chairmanName}
                  />
                )}
                {secretaryName && (
                  <DirectorsCard
                    title={t('wsvvrijheid.secretary')}
                    name={secretaryName}
                  />
                )}

                {accountantName && (
                  <DirectorsCard
                    title={t('wsvvrijheid.treasurer')}
                    name={accountantName}
                  />
                )}
              </SimpleGrid>
            </Stack>
            {/* documents */}

            <Wrap spacing={4} justify={'center'}>
              {foundation?.policy_plan && (
                <Button
                  as={Link}
                  href={API_URL + foundation?.policy_plan?.url}
                  rightIcon={<GrDocumentDownload />}
                  colorScheme={'blackAlpha'}
                  variant={'ghost'}
                  color={'initial'}
                  isExternal
                >
                  {' '}
                  {t('wsvvrijheid.policy-plan')}
                </Button>
              )}

              {foundation?.substantive_financial_annual_report && (
                <Button
                  as={Link}
                  href={
                    API_URL +
                    foundation?.substantive_financial_annual_report?.url
                  }
                  rightIcon={<GrDocumentDownload />}
                  colorScheme={'blackAlpha'}
                  variant={'ghost'}
                  color={'initial'}
                  isExternal
                >
                  {t('wsvvrijheid.financial_report')}
                </Button>
              )}
              {foundation?.remuneration_policy && (
                <Button
                  as={Link}
                  href={API_URL + foundation?.remuneration_policy?.url}
                  rightIcon={<GrDocumentDownload />}
                  colorScheme={'blackAlpha'}
                  variant={'ghost'}
                  color={'initial'}
                  isExternal
                >
                  {t('wsvvrijheid.remuneration_policy')}
                </Button>
              )}
            </Wrap>
          </Stack>
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
  })

  const foundation = foundationsData?.data?.[0]

  if (!foundation) return { notFound: true }

  return {
    props: {
      ...(await ssrTranslations(locale)),
      foundation,
    },
    revalidate: 1,
  }
}
