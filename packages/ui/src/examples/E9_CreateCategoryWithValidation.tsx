/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react'

import { Button, Code, Input, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import slugify from '@sindresorhus/slugify'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { CategoryCreateInput } from '@wsvvrijheid/types'

import { createCategoryWithMutation } from './utils'
import { FormItem } from '../components'

const schema = yup.object().shape({
  name_en: yup.string().required(),
  name_nl: yup.string().required(),
  name_tr: yup.string().required(),

  // TODO: Add all inputs
})

export const CreateCategoryWithValidation = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
  })

  const { mutate, data, isLoading } = useMutation({
    mutationKey: ['create-category'],
    mutationFn: (data: CategoryCreateInput) => createCategoryWithMutation(data),
  })

  const name_en = watch('name_en')

  useEffect(() => {
    // TODO: Update slug with slugify on name_en change
    setValue('slug', slugify(name_en ?? ''))
  }, [name_en])

  const onSubmit = async (data: CategoryCreateInput) => {
    mutate(data)
  }

  return (
    <Stack>
      <Code as={'pre'}>{JSON.stringify(data, null, 2)}</Code>
      <Stack as={'form'} onSubmit={handleSubmit(onSubmit)}>
        <FormItem
          placeholder="Category name (en)"
          name="name_en"
          register={register}
          errors={errors}
        />
        {/* TODO: Add all inputs */}
        <FormItem
          placeholder="Category name (en)"
          name="name_nl"
          register={register}
          errors={errors}
        />
        <FormItem
          placeholder="Category name (en)"
          name="name_tr"
          register={register}
          errors={errors}
        />
        <Button
          type={'submit'}
          isLoading={isLoading}
          loadingText={'Creating...'}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  )
}
