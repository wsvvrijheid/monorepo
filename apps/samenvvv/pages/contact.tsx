import { Box, Button, Heading, Link, Stack, VStack } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { FaWhatsapp } from 'react-icons/fa'
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md'

import { EMAIL_SENDER, socialLinks, TOKEN } from '@wsvvrijheid/config'
import { sendEmail } from '@wsvvrijheid/services'
import { EmailCreateInput } from '@wsvvrijheid/types'
import {
  ContactForm,
  ContactFormFieldValues,
  Container,
  SocialButtons,
} from '@wsvvrijheid/ui'

import { Layout } from '../components'
import i18nConfig from '../next-i18next.config'

interface ContactProps {
  seo: NextSeoProps
}

// eslint-disable-next-line no-empty-pattern
const Contact = ({ seo }: ContactProps): JSX.Element => {
  const { t } = useTranslation(['common'])

  const {
    isError,
    isLoading,
    isSuccess,
    mutate: sendForm,
  } = useMutation({
    mutationKey: ['contact'],
    mutationFn: async (data: EmailCreateInput) => {
      return sendEmail(data, TOKEN as string)
    },
  })

  const handleSubmit = async (data: ContactFormFieldValues) => {
    const emailData = {
      subject: `Form from ${data.fullname} (${data.email})`,
      text: data.message,
      from: EMAIL_SENDER,
    }

    return sendForm(emailData)
  }

  return (
    <Layout seo={seo}>
      <Box
        minH="inherit"
        // background="url('https://api.samenvvv.nl/uploads/...') no-repeat bottom"
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
              bgGradient={'linear(to-b, primary.400, primary.600)'}
              borderRadius="lg"
              p={{ base: 8, lg: 16 }}
              w={'full'}
              textAlign="center"
              justify="center"
              spacing={{ base: 8, lg: 16 }}
            >
              <Heading color={'primary.50'}>{t('samenvvv')}</Heading>
              <VStack alignItems="flex-start" color="primary.50">
                <Button
                  as={Link}
                  isExternal
                  borderWidth={2}
                  borderColor="transparent"
                  variant="ghost"
                  _hover={{ borderColor: 'primary.50' }}
                  leftIcon={<Box as={MdPhone} color="primary.50" size="20px" />}
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
                  _hover={{ borderColor: 'primary.50' }}
                  leftIcon={
                    <Box as={FaWhatsapp} color="primary.50" size="20px" />
                  }
                  href="https://api.whatsapp.com/send?phone=31685221308"
                >
                  {t('contact.form.message-label')}
                </Button>
                <Button
                  as={Link}
                  isExternal
                  borderWidth={2}
                  borderColor="transparent"
                  variant="ghost"
                  _hover={{ borderColor: 'primary.50' }}
                  leftIcon={<Box as={MdEmail} color="primary.50" size="20px" />}
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
                  _hover={{ borderColor: 'primary.50' }}
                  leftIcon={
                    <Box as={MdLocationOn} color="primary.50" size="20px" />
                  }
                  href="https://goo.gl/maps/E9HaayQnXmphUWtN8"
                >
                  Tandersplein 1, 3027 CN <br /> Rotterdam, Netherland
                </Button>
              </VStack>

              <SocialButtons items={socialLinks.samenvvv} />
            </VStack>

            <Box w="full">
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
