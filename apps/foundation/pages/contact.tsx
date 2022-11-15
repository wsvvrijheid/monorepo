import {
  Box,
  Button,
  Divider,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { socialLinks } from '@wsvvrijheid/config'
import { EmailData, sendEmail } from '@wsvvrijheid/services'
import {
  ContactForm,
  Container,
  SocialButtons,
  ContactFormFieldValues,
} from '@wsvvrijheid/ui'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md'

import { Layout } from '../components'
import i18nConfig from '../next-i18next.config'

interface ContactProps {
  seo: NextSeoProps
}

const Contact = ({ seo }: ContactProps): JSX.Element => {
  const { t } = useTranslation()

  const {
    isError,
    isLoading,
    isSuccess,
    mutate: sendForm,
  } = useMutation({
    mutationKey: ['contact'],
    mutationFn: async (data: EmailData) => {
      return sendEmail(data)
    },
  })

  const handleSubmit = async (data: ContactFormFieldValues) => {
    const emailData = {
      subject: `Form from ${data.fullname} (${data.email})`,
      text: data.message,
    }

    return sendForm(emailData)
  }

  return (
    <Layout seo={seo}>
      <Box minH="inherit">
        <Container minH="inherit">
          <SimpleGrid
            my={{ base: 8, lg: 0 }}
            gap={8}
            alignContent="center"
            columns={{ base: 1, lg: 2 }}
            minH="inherit"
          >
            <VStack
              bg="gray.700"
              color="primary.50"
              borderRadius="lg"
              p={{ base: 8, lg: 12 }}
              textAlign="center"
              justify="space-evenly"
              spacing={8}
            >
              <Heading fontWeight="black" as="h2" size="lg" color="primary.200">
                STICHTING <br /> WEES DE STEM VOOR VRIJHEID
              </Heading>
              <Divider borderColor="whiteAlpha.400" />

              <Wrap spacing={4} justify="center">
                <Button
                  as={Link}
                  isExternal
                  variant="link"
                  color="primary.50"
                  _hover={{ color: 'primary.200' }}
                  leftIcon={
                    <Box as={MdPhone} color="primary.200" size="20px" />
                  }
                  href="tel:+31685221308"
                >
                  +31-6 85221308
                </Button>
                <Button
                  as={Link}
                  isExternal
                  variant="link"
                  color="primary.50"
                  _hover={{ color: 'primary.200' }}
                  leftIcon={
                    <Box as={MdEmail} color="primary.200" size="20px" />
                  }
                  href="mailto:info@wsvvrijheid.nl"
                >
                  info@wsvvrijheid.nl
                </Button>
                <Button
                  as={Link}
                  isExternal
                  variant="link"
                  color="primary.50"
                  _hover={{ color: 'primary.200' }}
                  leftIcon={
                    <Box as={MdLocationOn} color="primary.200" size="20px" />
                  }
                  href="https://goo.gl/maps/E9HaayQnXmphUWtN8"
                  textAlign="left"
                >
                  Tandersplein 1, 3027 CN, Rotterdam
                </Button>
              </Wrap>

              <SocialButtons items={socialLinks.wsvvrijheid} />

              <Stack w="full" spacing={4}>
                <Stack w="full">
                  <Text color="blue.200" fontWeight="semibold">
                    {t('wsvvrijheid.management')}
                  </Text>
                  <Wrap justify="space-around" spacing={4}>
                    <Box>
                      <Text fontSize="sm">{t('wsvvrijheid.chairman')}</Text>
                      <Text>Sümeyye Ateş</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm">{t('wsvvrijheid.treasurer')}</Text>
                      <Text>Davut Dur</Text>
                    </Box>
                  </Wrap>
                </Stack>
                <Divider borderColor="whiteAlpha.400" />
                <Wrap justify="space-around" fontSize="sm" textAlign="left">
                  <Text>KVK: 85680621</Text>
                  <Text>RSIN: 863705571 </Text>
                </Wrap>
              </Stack>
            </VStack>

            <ContactForm
              onSubmitHandler={handleSubmit}
              isLoading={isLoading}
              isSuccess={isSuccess}
              isError={isError}
            />
          </SimpleGrid>
        </Container>
      </Box>
    </Layout>
  )
}

export default Contact

export const getStaticProps = async context => {
  const { locale } = context

  const title = {
    en: 'Contact',
    tr: 'İletişim',
    nl: 'Contact',
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
