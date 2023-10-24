import { FC, useEffect } from 'react'

import {
  Box,
  Button,
  chakra,
  Checkbox,
  FormLabel,
  Heading,
  Stack,
  Switch,
  Text,
  Textarea,
  Wrap,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import { setLocale } from 'yup'
import { tr, nl } from 'yup-locales'

import { heardFrom } from './data'
import { joinSchema } from './schema'
import { JoinFormFieldValues, JoinFormProps } from './types'
import { FormItem } from '../FormItem'

export const JoinForm: FC<JoinFormProps> = ({
  onSubmitHandler,
  isLoading,
  platforms = [],
}) => {
  const { t } = useTranslation()

  const { locale } = useRouter()

  useEffect(() => {
    if (locale === 'tr') setLocale(tr)
    if (locale === 'nl') setLocale(nl)
  }, [locale])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinFormFieldValues>({
    resolver: yupResolver(joinSchema()),
    mode: 'onTouched',
  })

  const onSubmit: SubmitHandler<JoinFormFieldValues> = data => {
    const platformsId: Array<number> = []
    console.log('submit data', data)

    platforms.map(platform => {
      const jb = platform?.jobs?.map(job => job.id)
      const dataJobId = data.jobs.map(el => parseInt(el))
      jb?.forEach(el => {
        dataJobId.forEach(Id => {
          if (el === Id) {
            !platformsId.includes(platform?.id) &&
              platformsId.push(platform?.id)
          }
        })
      })
    })
    const newPlarformsId = platformsId.join().split(',')

    const newData = { ...data, platforms: newPlarformsId }

    onSubmitHandler(newData)
  }
  // console.log("platforms",platforms)

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
        <FormItem register={register} id="phone" name="phone" errors={errors} />
        <FormItem
          type="number"
          register={register}
          id="availableHours"
          name="availableHours"
          errors={errors}
          isRequired
        />
        <FormItem
          type="number"
          register={register}
          id="age"
          name="age"
          errors={errors}
          isRequired
        />
      </Stack>
      <FormItem
        register={register}
        errors={errors}
        id="occupation"
        name="occupation"
      />
      <FormItem
        register={register}
        errors={errors}
        id="city"
        name="city"
        isRequired
      />

      <FormItem
        as={Textarea}
        register={register}
        errors={errors}
        id="comment"
        name="comment"
      />

      <Stack justify="space-between" direction={{ base: 'column', md: 'row' }}>
        <Switch
          id="in-mailing-list"
          alignItems={'center'}
          display={'flex'}
          {...register('inMailingList')}
        >
          {t('apply-form.in-mailing-list')}
        </Switch>
        <Switch id="is-public" {...register('isPublic')}>
          {t('apply-form.show-in-website')}
        </Switch>
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
            <Checkbox
              key={item.value}
              id={item.value}
              {...register(`heardFrom`)}
              value={item.value}
              textTransform="capitalize"
            >
              {item?.label[locale]}
            </Checkbox>
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
                <Checkbox
                  key={job.id}
                  id={job.id.toString()}
                  {...register(`jobs`)}
                  value={job.id}
                  textTransform={'capitalize'}
                >
                  {job[`name_${locale}`]}
                </Checkbox>
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
