import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  Link,
  VStack,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import {
  ContactForm,
  ContactFormFieldValues,
  Container,
  SocialButtons,
} from '@wsvvrijheid/ui'
import { EmailData, sendEmail } from '@wsvvrijheid/utils'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { useTranslation } from 'react-i18next'
import { FaWhatsapp } from 'react-icons/fa'
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md'

import { Layout } from '../components'
import i18nConfig from '../next-i18next.config'

interface ContactProps {
  seo: NextSeoProps
}

// eslint-disable-next-line no-empty-pattern
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
      {/* How can I access the background image url? */}
      <Box
        minH="inherit"
        background="url(/images/bg-wave.svg) no-repeat bottom"
      >
        <Container minH="inherit" maxW="container.xl">
          <Stack
            justify="center"
            align="center"
            spacing={8}
            direction={{ base: 'column', lg: 'row' }}
            minH="inherit"
          >
            <VStack
              bg="gray.700"
              borderRadius="lg"
              p={{ base: 8, lg: 16 }}
              w={{ base: 'full', lg: '500px' }}
              textAlign="center"
              justify="center"
              spacing={{ base: 8, lg: 16 }}
            >
              <Box>
                <Heading>
                  {/* I couldn't get the translations in local, it appeared as contact.title maybe it is visible when it is published in vercel */}
                  {t('contact.title')}
                </Heading>
                <Text mt={{ sm: 3, md: 3, lg: 5 }} color="primary.50">
                  {t('contact.fill-form')}
                </Text>
              </Box>
              <VStack alignItems="flex-start" color="primary.50">
                <Button
                  as={Link}
                  isExternal
                  borderWidth={2}
                  borderColor="transparent"
                  variant="ghost"
                  _hover={{ borderColor: 'primary.400' }}
                  leftIcon={
                    <Box as={MdPhone} color="primary.400" size="20px" />
                  }
                  href="tel:+31685221308"
                >
                  +31-6 85221308
                </Button>
                <Button
                  as={Link}
                  isExternal
                  borderWidth={2}
                  borderColor="transparent"
                  variant="ghost"
                  _hover={{ borderColor: 'primary.400' }}
                  leftIcon={
                    <Box as={FaWhatsapp} color="primary.400" size="20px" />
                  }
                  href="https://api.whatsapp.com/send?phone=31685221308"
                >
                  {/* I could not find a suitable message defined here in the common file */}
                  {t('contact.form.message-label')}
                </Button>
                <Button
                  as={Link}
                  isExternal
                  borderWidth={2}
                  borderColor="transparent"
                  variant="ghost"
                  _hover={{ borderColor: 'primary.400' }}
                  leftIcon={
                    <Box as={MdEmail} color="primary.400" size="20px" />
                  }
                  href="mailto:info@samenvvv.nl"
                >
                  info@samenvvv.nl
                </Button>
                <Button
                  as={Link}
                  isExternal
                  borderWidth={2}
                  borderColor="transparent"
                  variant="ghost"
                  _hover={{ borderColor: 'primary.400' }}
                  leftIcon={
                    <Box as={MdLocationOn} color="primary.400" size="20px" />
                  }
                  href="https://goo.gl/maps/E9HaayQnXmphUWtN8"
                >
                  Tandersplein 1, 3027 CN <br /> Rotterdam, Netherland
                </Button>
              </VStack>

              <SocialButtons items={[]} />
            </VStack>
            <Box
              w={{ base: 'full', lg: '500px' }}
              bg="white"
              borderRadius="lg"
              p={{ base: 8, lg: 16 }}
              shadow="primary"
            >
              <ContactForm
                onSubmitHandler={handleSubmit}
                isLoading={isLoading}
                isSuccess={isSuccess}
                isError={isError}
              />
            </Box>
          </Stack>
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
