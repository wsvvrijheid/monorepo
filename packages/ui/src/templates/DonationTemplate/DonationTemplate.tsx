import { FC, useState } from 'react'

import {
  Box,
  Button,
  HStack,
  ButtonGroup,
  Heading,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { TFunction, useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { AiOutlineEuroCircle } from 'react-icons/ai'
import { FaDonate } from 'react-icons/fa'
import * as yup from 'yup'

import { Platform } from '@wsvvrijheid/types'

import { Container, FormItem, PlatformList } from '../../components'

function generateSchema(t: TFunction) {
  return yup.object().shape({
    name: yup.string().required(t('apply-form.name.required')),
    email: yup
      .string()
      .email(t('apply-form.email.invalid'))
      .required(t('apply-form.email.required')),
  })
}

type FormFieldValues = {
  name: string
  email: string
}

type DonationTemplateProps = {
  platforms?: Platform[]
  isDark?: boolean
}

export const DonationTemplate: FC<DonationTemplateProps> = ({
  platforms,
  isDark,
}) => {
  const [amount, setAmount] = useState(5)
  const [type, setType] = useState<'one-time' | 'monthly'>('one-time')
  const { t } = useTranslation()

  const donationAmounts = useBreakpointValue({
    base: [5, 10, 20, 50],
    sm: [5, 10, 20, 50, 100],
  }) || [5, 10, 20, 50]

  const format = (val: number) => `€` + val
  const parse = (val: string) => +val.replace(/^€/, '')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormFieldValues>({
    resolver: yupResolver(generateSchema(t)),
    mode: 'onTouched',
  })

  const onSubmit = async (data: FormFieldValues) => {
    try {
      const { name, email } = data

      const result = await axios.post('/api/payment', {
        amount,
        name,
        email,
        type,
      })

      window.location = result.data
    } catch (error) {
      console.error('request payment error', error)
    }
  }

  return (
    <Container {...(!platforms && { maxW: '2xl' })}>
      <SimpleGrid
        alignItems="start"
        columns={{ base: 1, lg: platforms ? 2 : 1 }}
        my={16}
        gap={16}
        pos={'relative'}
      >
        <Stack
          px={{ base: 8, lg: 16 }}
          py={{ base: 8, lg: 12 }}
          spacing={8}
          bg={'white'}
          {...(isDark && {
            borderColor: 'whiteAlpha.200',
            borderWidth: 2,
            bg: 'whiteAlpha.200',
          })}
          rounded="lg"
          shadow="lg"
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          pos={'sticky'}
          top={16}
        >
          <Heading as="h3" size="lg" textAlign="center" fontWeight={900}>
            {t('donation.title')}
          </Heading>

          <Stack align="center">
            <HStack spacing={4}>
              <Image src={`/images/ideal-logo.svg`} h={50} alt="ideal" />

              <Image
                src={`/images/visa-master-logo.svg`}
                h={50}
                alt="visa mastercard"
              />
              <Image src={`/images/apple-pay.svg`} h={50} alt="apple pay" />

              <Image src={`/images/google-pay.svg`} h={50} alt="google pay" />
            </HStack>
            <Text textAlign="center" fontSize="md" color="gray.500">
              {t('donation.check-payment-method')}
            </Text>
          </Stack>

          <ButtonGroup w="full" isAttached alignSelf="center" size="lg">
            {donationAmounts.map(val => (
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
              min={5}
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
              defaultValue={5}
              value={amount}
              min={5}
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

          <Stack>
            <Button
              isDisabled={!amount || !isValid}
              type="submit"
              leftIcon={<FaDonate />}
              onClick={() => setType('one-time')}
              colorScheme="primary"
            >
              {t('donation.one-time')}
              {amount && ` €${amount}`}
            </Button>
            <Button
              isDisabled={!amount || !isValid}
              type="submit"
              leftIcon={<FaDonate />}
              onClick={() => setType('monthly')}
              colorScheme="purple"
            >
              {t('donation.monthly')}
              {amount && ` €${amount}`}
            </Button>
          </Stack>
        </Stack>
        {platforms && <PlatformList platforms={platforms} />}
      </SimpleGrid>
    </Container>
  )
}
