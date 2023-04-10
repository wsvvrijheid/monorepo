import { FC } from 'react'

import {
  Box,
  Button,
  SimpleGrid,
  Stack,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { TFunction, useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { TOKEN } from '@wsvvrijheid/config'
import { Mutation } from '@wsvvrijheid/lib'
import { CourseApplicationCreateInput } from '@wsvvrijheid/types'

import { ApplicationFormFields, CourseApplicationFormProps } from './types'
import { FormItem } from '../FormItem'

export const CourseApplicationForm: FC<CourseApplicationFormProps> = ({
  courseId,
}) => {
  const { t } = useTranslation()
  // const [termsAccepted, setTermsAccepted] = useState(false)
  // const [privacyAccepted, setPrivacyAccepted] = useState(false)

  const toast = useToast()

  const schema = (t: TFunction) =>
    yup.object({
      name: yup.string().required(t('apply-form.name.required') as string),
      email: yup
        .string()
        .email(t('apply-form.email.invalid') as string)
        .max(255)
        .required(t('apply-form.email.required') as string),
      country: yup.string(),
      city: yup.string(),
      phone: yup.string(),
      message: yup.string(),
    })

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ApplicationFormFields>({
    resolver: yupResolver(schema(t)),
    mode: 'all',
  })

  const { mutate } = useMutation({
    mutationKey: ['course-apply'],
    mutationFn: (data: CourseApplicationCreateInput) =>
      Mutation.post('api/course-applications', data, TOKEN as string),
  })

  const onSubmit = (data: ApplicationFormFields) => {
    mutate(
      { ...data, course: courseId },
      {
        onSuccess: () => {
          reset()

          toast({
            title: 'Success',
            description: 'Your application has been submitted',
            status: 'success',
          })
        },
      },
    )
  }

  // const valid = isValid && termsAccepted && privacyAccepted

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={8}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
          <FormItem
            name="name"
            register={register}
            errors={errors}
            hideLabel
            label={t('apply-form.name.input') as string}
          />
          <FormItem
            name="email"
            type="email"
            register={register}
            errors={errors}
            hideLabel
            label={t('apply-form.email.input') as string}
          />
          <FormItem
            name="country"
            register={register}
            errors={errors}
            hideLabel
            label={t('country') as string}
          />

          <FormItem
            name="city"
            register={register}
            errors={errors}
            hideLabel
            label={t('city') as string}
          />
          <FormItem
            name="phone"
            register={register}
            errors={errors}
            hideLabel
            label={t('apply-form.phone.input') as string}
          />

          <Box gridColumn={{ lg: 'span 2' }}>
            <FormItem
              as={Textarea}
              name="message"
              register={register}
              errors={errors}
              hideLabel
              label={t('motivation') as string}
            />
          </Box>
        </SimpleGrid>

        {/* <Stack spacing={2}>
          <Checkbox
            fontSize={'14px'}
            fontWeight={'400'}
            lineHeight={'20px'}
            onChange={e => setTermsAccepted(e.target.checked)}
          >
            <Trans
              i18nKey="apply-form.terms"
              components={{ a: <Link href={'/'} color="primary.500" /> }}
            />
          </Checkbox>
          <Checkbox
            fontSize={'14px'}
            fontWeight={'400'}
            lineHeight={'20px'}
            onChange={e => setPrivacyAccepted(e.target.checked)}
          >
            <Trans
              i18nKey="apply-form.agreement"
              components={{ a: <Link href={'/'} color="primary.500" /> }}
            />
          </Checkbox>
        </Stack> */}
        <Button w={'100%'} type="submit" isDisabled={!isValid}>
          {t('apply-form.apply')}
        </Button>
      </Stack>
    </form>
  )
}
