import { FC } from 'react'

import {
  Box,
  Button,
  chakra,
  Checkbox,
  FormLabel,
  Heading,
  HStack,
  Stack,
  Switch,
  Text,
  Textarea,
  Wrap,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'next-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ObjectSchema } from 'yup'

import { heardFrom } from './data'
import { joinSchema } from './schema'
import { JoinFormFieldValues, JoinFormFProps } from './types'
import { FormItem } from '../FormItem'

export const JoinForm: FC<JoinFormFProps> = ({
  onSubmitHandler,
  isLoading,
  platforms = [],
  locale,
}) => {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinFormFieldValues>({
    resolver: yupResolver(joinSchema() as ObjectSchema<JoinFormFieldValues>),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      age: 0,
      city: '',
      email: '',
      phone: '',
      availableHours: 0,
      occupation: '',
      comment: '',
      inMailingList: false,
      isPublic: false,
      heardFrom: [],
      jobs: [],
    },
  })

  const onSubmit: SubmitHandler<JoinFormFieldValues> = data => {
    onSubmitHandler(data)
  }

  // age, name=surname, city
  return (
    <Stack
      p={8}
      bg="white"
      rounded="lg"
      shadow="base"
      as="form"
      spacing={4}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading as="h3" size="lg" textAlign="center" fontWeight={900}>
        {t('apply-form.title')}
      </Heading>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
        <FormItem
          register={register}
          id="name"
          name="name"
          errors={errors}
          isRequired
        />
        <FormItem
          name="email"
          register={register}
          id="email"
          errors={errors}
          isRequired
        />
      </Stack>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
        <FormItem
          register={register}
          id="phone"
          name="phone"
          errors={errors}
          isRequired
        />
        <FormItem
          type="number"
          register={register}
          id="availableHours"
          name="availableHours"
          errors={errors}
          defaultValue={1}
          isRequired
        />
        <FormItem
          type="number"
          register={register}
          id="age"
          name="age"
          errors={errors}
          defaultValue={1}
          isRequired
        />
      </Stack>
      <FormItem
        register={register}
        errors={errors}
        id="occupation"
        name="occupation"
      />
      <FormItem register={register} errors={errors} id="city" name="city" />

      <FormItem
        as={Textarea}
        register={register}
        errors={errors}
        id="comment"
        name="comment"
      />

      <Stack justify="space-between" direction={{ base: 'column', md: 'row' }}>
        <HStack>
          <Switch id="in-mailing-list" {...register('inMailingList')} />
          <FormLabel htmlFor="in-mailing-list">
            {t('apply-form.in-mailing-list')}
          </FormLabel>
        </HStack>
        <HStack>
          <Switch id="is-public" {...register('isPublic')} />
          <FormLabel htmlFor="is-public">
            {t('apply-form.show-in-website')}
          </FormLabel>
        </HStack>
      </Stack>

      {/* heard FROM */}
      <Box>
        <FormLabel fontSize="sm" fontWeight={600}>
          {t('apply-form.heard-from')}
        </FormLabel>
        <Wrap
          p={4}
          spacing={4}
          rounded="lg"
          borderWidth={2}
          borderColor={errors['heardFrom'] ? 'red.400' : 'gray.100'}
        >
          {heardFrom.map(item => (
            <HStack key={item.value}>
              <Checkbox
                id={item.value}
                {...register(`heardFrom`)}
                value={item.value}
              />

              <FormLabel textTransform="capitalize" htmlFor={item.value}>
                {item?.label[locale]}
              </FormLabel>
            </HStack>
          ))}
        </Wrap>
        {errors['heardFrom'] && (
          <Text fontSize="sm" color="red.500">
            {errors.heardFrom.message}
          </Text>
        )}
      </Box>

      {/* JOBS */}
      <Box>
        <FormLabel fontSize="sm" fontWeight={600}>
          {t('jobs')}
          <chakra.span color="red.500">*</chakra.span>
        </FormLabel>
        <Stack
          spacing={8}
          rounded="lg"
          p={4}
          borderWidth={2}
          borderColor={errors['jobs'] ? 'red.500' : 'gray.100'}
        >
          {platforms?.map((platform, i) => (
            <Stack key={i}>
              <Text fontWeight={600} fontSize="sm">
                {platform[`name_${locale}`]}
              </Text>
              {platform?.jobs?.map(job => (
                <HStack key={job.id}>
                  <Checkbox
                    id={job.id.toString()}
                    {...register(`jobs`)}
                    value={job.id}
                  />
                  <FormLabel
                    textTransform="capitalize"
                    htmlFor={job.id.toString()}
                  >
                    {job[`name_${locale}`]}
                  </FormLabel>
                </HStack>
              ))}
            </Stack>
          ))}
          {errors['jobs'] && (
            <Text fontSize="sm" color="red.500">
              {errors.jobs.message}
            </Text>
          )}
        </Stack>
      </Box>
      <Button isLoading={isLoading} size="lg" type="submit">
        {t('submit')}
      </Button>
    </Stack>
  )
}
