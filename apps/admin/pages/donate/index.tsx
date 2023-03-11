import { FC, useState } from 'react'

import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Heading,
  HStack,
  Image,
  Link,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
  Tooltip,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { DONATION_ENABLED } from '@wsvvrijheid/config'
import { AdminLayout, Container, FormItem } from '@wsvvrijheid/ui'
import axios from 'axios'
import { InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useForm } from 'react-hook-form'
import { AiOutlineEuroCircle } from 'react-icons/ai'
import { FaDonate } from 'react-icons/fa'
import * as yup from 'yup'

function generateSchema(t) {
  return yup.object().shape({
    name: yup.string().required(t`apply-form.name.required`),
    email: yup
      .string()
      .email(t`apply-form.email.invalid`)
      .required(t`apply-form.email.required`),
  })
}

type DonatePageProps = InferGetStaticPropsType<typeof getStaticProps>

const DonatePage: FC<DonatePageProps> = ({ title }) => {
  const [amount, setAmount] = useState(10)
  const [method, setMethod] = useState<'ideal' | 'creditcard' | 'paypal'>(
    'ideal',
  )
  const { t } = useTranslation()

  const format = (val: number) => `€` + val
  const parse = (val: string) => +val.replace(/^€/, '')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(generateSchema(t)),
    mode: 'onTouched',
  })

  const onSubmit = async data => {
    try {
      const { name, email } = data

      const result = await axios.post('/api/payment', {
        amount,
        method,
        name,
        email,
      })

      window.location = result.data
    } catch (error) {
      console.error('request payment error', error)
    }
  }

  return (
    <AdminLayout seo={{ title }}>
      <Container>
        <Center m={16}>
          <VStack>
            <Text>{t('donation.description')}</Text>

            <Link href="https://challenges.nl" isExternal>
              <HStack align={'center'}>
                <Image
                  alt={'Stichting Challenges'}
                  src="https://challenges.nl/wp-content/uploads/2022/12/challengeslogo-1.png"
                  w={150}
                />
                <Text fontSize="xl">Stichting Challenges</Text>
              </HStack>
            </Link>
          </VStack>
        </Center>
        <VStack my={16} gap={16}>
          <Stack
            px={{ base: 8, lg: 16 }}
            py={{ base: 8, lg: 12 }}
            spacing={8}
            bg="white"
            rounded="lg"
            shadow="lg"
            as="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Heading as="h3" size="lg" textAlign="center" fontWeight={900}>
              {title}
            </Heading>

            <Stack align="center">
              <ButtonGroup>
                <Button
                  py={4}
                  colorScheme={method === 'ideal' ? 'primary' : 'gray'}
                  variant={method === 'ideal' ? 'solid' : 'outline'}
                  onClick={() => setMethod('ideal')}
                  h="auto"
                  size="lg"
                >
                  <Image
                    src={`https://api.wsvvrijheid.nl/uploads/ideal_logo_921778ac67.svg`}
                    h={50}
                    alt="ideal"
                  />
                </Button>
                <Tooltip label={'Not available yet'}>
                  <Button
                    py={4}
                    colorScheme={method === 'creditcard' ? 'primary' : 'gray'}
                    variant={method === 'creditcard' ? 'solid' : 'outline'}
                    onClick={() => setMethod('creditcard')}
                    h="auto"
                    size="lg"
                    disabled
                    isDisabled
                  >
                    <Image
                      src={`https://api.wsvvrijheid.nl/uploads/visa_master_logo_0b0568b367.svg`}
                      h={50}
                      alt="ideal"
                    />
                  </Button>
                </Tooltip>
                {/* <Button
                  py={4}
                  colorScheme={method === 'paypal' ? 'primary' : 'gray'}
                  variant={method === 'paypal' ? 'solid' : 'outline'}
                  onClick={() => setMethod('paypal')}
                  h="auto"
                  size="lg"
                >
                  <Image
                    src={`https://api.wsvvrijheid.nl/uploads/paypal_logo_ba4b1e3df7.svg`}
                    h={50}
                    alt="ideal"
                  />
                </Button> */}
              </ButtonGroup>
              <Text textAlign="center" fontSize="md" color="gray.500">
                {t('donation.checkpaymentmethod')} *
              </Text>
            </Stack>

            <ButtonGroup w="full" isAttached alignSelf="center" size="lg">
              {useBreakpointValue({
                base: [5, 10, 20, 50],
                sm: [5, 10, 20, 50, 100],
              }).map(val => (
                <Button
                  w="full"
                  key={val}
                  variant={amount === val ? 'solid' : 'outline'}
                  colorScheme={amount === val ? 'primary' : 'gray'}
                  onClick={() => setAmount(val)}
                >
                  €{val}
                </Button>
              ))}
            </ButtonGroup>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              pb={8}
              w="full"
              justify="center"
              align="center"
              spacing={6}
            >
              <NumberInput
                maxW={120}
                onChange={valueString => setAmount(parse(valueString))}
                value={format(amount)}
                min={10}
                size="lg"
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Slider
                flex={1}
                id="slider"
                defaultValue={10}
                value={amount}
                min={10}
                max={100}
                colorScheme="primary"
                onChange={v => setAmount(v)}
                focusThumbOnChange={false}
              >
                <SliderTrack height={3} rounded="lg">
                  <SliderFilledTrack />
                </SliderTrack>
                <Tooltip
                  hasArrow
                  bg="primary.500"
                  color="white"
                  placement="bottom"
                  isOpen={!!amount}
                  label={`€${amount}`}
                >
                  <SliderThumb boxSize={6} bg="primary.500" color="white">
                    <Box boxSize="full" as={AiOutlineEuroCircle} />
                  </SliderThumb>
                </Tooltip>
              </Slider>
            </Stack>

            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <FormItem
                isRequired
                register={register}
                name="name"
                errors={errors}
                label={t`apply-form.name.input`}
              />
              <FormItem
                isRequired
                register={register}
                name="email"
                errors={errors}
                label={t`apply-form.email.input`}
              />
            </Stack>

            <Button
              isDisabled={!amount || !method || !isValid}
              colorScheme="primary"
              type="submit"
              leftIcon={<FaDonate />}
            >
              {title}
              {amount && ` €${amount}`}
            </Button>
          </Stack>
        </VStack>
      </Container>
    </AdminLayout>
  )
}

export const getStaticProps = async context => {
  if (!DONATION_ENABLED) {
    return {
      notFound: true,
    }
  }

  const seo = {
    title: {
      en: 'Donate',
      nl: 'Doneer',
      tr: 'Bağış Yap',
    },
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common'])),
      title: seo.title[context.locale],
    },
  }
}

export default DonatePage
