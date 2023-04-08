import { FC } from 'react'

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  HStack,
  Image,
  Link,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { CgCalendarDates } from 'react-icons/cg'
import { FiMinus } from 'react-icons/fi'
import { GiSelfLove } from 'react-icons/gi'
import { GoLocation, GoPlus } from 'react-icons/go'
import { IoIosPeople } from 'react-icons/io'
import { RiMoneyEuroCircleLine } from 'react-icons/ri'
import * as yup from 'yup'

import { CourseDetailPageProps } from './types'
import { FormItem } from '../FormItem'
import { ShareButtons } from '../ShareButtons'

export const CourseDetailPage: FC<CourseDetailPageProps> = ({
  content,
  description,
  dueDate,
  image,
  price,
  startDate,
  title,
}) => {
  const router = useRouter()
  const schema = () =>
    yup.object({
      name: yup.string().required(),
      surname: yup.string().required(),
      city: yup.string().required(),
      phone: yup.string(),
      job: yup.string(),
      email: yup
        .string()
        .email('Field should contain a valid e-mail')
        .max(255)
        .required('E-mail is required'),
      terms: yup.array().required().min(2),
    })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema()),
    mode: 'all',
  })

  return (
    <Stack mx={5}>
      <Image src={image} alt="" />
      <Stack
        justifyContent={'space-between'}
        flexDirection={{ base: 'column', sm: 'column', md: 'row', lg: 'row' }}
      >
        <VStack w={'100'} justifyContent={'left'}>
          <HStack w={'100%'} justifyContent={'start'}>
            <CgCalendarDates />
            <Text>Başlama tarihi: {startDate}</Text>
          </HStack>
          <HStack w={'100%'} justifyContent={'start'}>
            <CgCalendarDates />
            <Text>Bitiş tarihi: {dueDate}</Text>
          </HStack>
        </VStack>
        <VStack display={'flex'} justifyContent={'left'}>
          <HStack w={'100%'} justifyContent={'start'}>
            <GoLocation />
            <Text>Toplam süre: 10 hafta</Text>
          </HStack>
          <HStack w={'100%'} justifyContent={'start'}>
            <RiMoneyEuroCircleLine />
            <Text>Ucret: {price}</Text>
          </HStack>
        </VStack>
        <VStack>
          <HStack w={'100%'} justifyContent={'start'}>
            <GoLocation />
            <Text>Eğitim dili: Türkçe</Text>
          </HStack>
          <HStack w={'100%'} justifyContent={'start'}>
            <IoIosPeople />
            <Text>Kontenjan: 100</Text>
          </HStack>
        </VStack>
        <HStack>
          <Button
            backgroundColor={'transparent'}
            border={'1px solid lightgray'}
            borderRadius={'50%'}
            w={'40px'}
            h={'40px'}
            p={0}
          >
            <GiSelfLove />
          </Button>
          <ShareButtons
            size={'md'}
            title={title}
            quote={description}
            url={router.pathname}
          />
        </HStack>
      </Stack>
      <VStack>
        <Text
          color={'blue.500'}
          fontWeight={'700'}
          fontSize={'36px'}
          lineHeight={'40px'}
          textAlign={'center'}
          my={5}
        >
          {title}
        </Text>
        <Text
          fontWeight={'500'}
          fontSize={'18px'}
          lineHeight={'28px'}
          textAlign={'justify'}
        >
          {description}
        </Text>
      </VStack>
      <Stack>
        <Text
          color={'blue.400'}
          fontWeight={'800'}
          fontSize={'24px'}
          lineHeight={'32px'}
          mt={3}
        >
          Senaryo Kursu Kayıt Başvuru Formu
        </Text>
        <Stack onSubmit={handleSubmit}>
          <HStack>
            <FormItem
              name="name"
              register={register}
              errors={errors}
              hideLabel
              label="Adınız"
              bgColor={'white'}
              my={3}
            />
            <FormItem
              name="surname"
              register={register}
              errors={errors}
              hideLabel
              label="Soyadınız"
              bgColor={'white'}
              my={3}
            />
          </HStack>
          <HStack>
            <FormItem
              name="city"
              register={register}
              errors={errors}
              hideLabel
              label="Şehir"
              bgColor={'white'}
              my={3}
            />
            <FormItem
              name="phone"
              register={register}
              errors={errors}
              hideLabel
              label="Teefon Numaranız"
              bgColor={'white'}
              my={3}
            />
          </HStack>
          <HStack>
            <FormItem
              name="job"
              register={register}
              errors={errors}
              hideLabel
              label="Mesleğiniz"
              bgColor={'white'}
              my={3}
            />
            <FormItem
              name="email"
              type="email"
              register={register}
              errors={errors}
              hideLabel
              label="E-mail"
              bgColor={'white'}
              my={3}
            />
          </HStack>
          <FormItem
            as={Textarea}
            name="description"
            register={register}
            errors={errors}
            hideLabel
            label="Kendinden bahset"
            bgColor={'white'}
            my={3}
          />

          <Stack my={5}>
            <Checkbox
              fontSize={'14px'}
              fontWeight={'400'}
              lineHeight={'20px'}
              {...register('terms')}
            >
              <Link href={'/'} color="red.500">
                Ön Bilgilendirme Formu’nu
              </Link>{' '}
              okudum, Kabul ediyorum
            </Checkbox>
            <Checkbox
              fontSize={'14px'}
              fontWeight={'400'}
              lineHeight={'20px'}
              {...register('terms')}
            >
              <Link href={'/'} color="red.500">
                Kullanici Sözleşme metnini
              </Link>{' '}
              okudum, Kabul ediyorum{' '}
            </Checkbox>
          </Stack>
          <Button
            backgroundColor={'blue.500'}
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            w={'100%'}
            color={'white'}
            padding={'0px 24px'}
          >
            Kayıt ol
          </Button>
        </Stack>
      </Stack>
      <Accordion allowMultiple>
        <AccordionItem border={'none'}>
          <AccordionButton
            color={'blue.500'}
            fontWeight={'700'}
            fontSize={'30px'}
            lineHeight={'36px'}
          >
            Sık sorulan sorular
          </AccordionButton>
          <AccordionPanel>
            <Accordion allowMultiple>
              {[
                {
                  question: 'soru 1',
                  content:
                    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus enim quasi magni, dolorum illum recusandae animi fugit nisi quae aliquid exercitationem aut provident modi suscipit ipsam ullam nemo, ex quia?',
                },
              ].map(item => (
                <AccordionItem>
                  {({ isExpanded }) => (
                    <>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            {item.question}
                          </Box>
                          {isExpanded ? (
                            <FiMinus fontSize="12px" />
                          ) : (
                            <GoPlus fontSize="12px" />
                          )}
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>{item.content}</AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem border={'none'}>
          <AccordionButton
            color={'blue.500'}
            fontWeight={'700'}
            fontSize={'30px'}
            lineHeight={'36px'}
          >
            Diğer Kurslar
          </AccordionButton>
        </AccordionItem>
      </Accordion>
    </Stack>
  )
}
