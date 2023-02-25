import {
  Box,
  Button,
  Divider,
  Heading,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { EMAIL_SENDER, socialLinks, TOKEN } from '@wsvvrijheid/config'
import { sendEmail } from '@wsvvrijheid/services'
import { EmailCreateInput } from '@wsvvrijheid/types'
import {
  ContactForm,
  Container,
  SocialButtons,
  ContactFormFieldValues,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { MdEmail } from 'react-icons/md'

import { Layout } from '../components'
import i18nConfig from '../next-i18next.config'

interface ContactProps {
  seo: NextSeoProps
}

const about = {
  tr: `Sanata ilgi duyan Hollanda’ya göç etmiş kişilerin hem online hem fiziki olarak buluştuğu, modern ve geleneksel sanatlar üzerine bilgi paylaşımı yaptıkları, aynı zamanda sanatsal aktiviteler organize ettikleri bir gruptur.`,
  en: `Art Station is a group where people who took emigrated in the Netherlands, who are interested in art, meet both online and physically, share their experiences with each other, share information on modern and traditional arts, and organize artistic activities at the same time.`,
  nl: `Kunsthalte is een groep waar mensen die naar Nederland zijn geëmigreerd, geïnteresseerd zijn in kunst, elkaar online en fysiek ontmoeten, hun ervaringen met elkaar delen, informatie delen over moderne en traditionele kunst en tegelijkertijd artistieke activiteiten organiseren.`,
}

const Contact = ({ seo }: ContactProps): JSX.Element => {
  const { locale } = useRouter()

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

  const title = {
    tr: 'Sanat Durağı',
    en: 'Art Station',
    nl: 'Kunsthalte',
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
                {title[locale]}
              </Heading>
              <Text>{about[locale]}</Text>

              <Divider borderColor="whiteAlpha.400" />

              <Button
                as={Link}
                isExternal
                variant="link"
                color="primary.50"
                _hover={{ color: 'primary.200' }}
                leftIcon={<Box as={MdEmail} color="primary.200" size="20px" />}
                href="mailto:kunsthalte@wsvvrijheid.nl"
              >
                kunsthalte@wsvvrijheid.nl
              </Button>

              <SocialButtons items={socialLinks.kunsthalte} />
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
