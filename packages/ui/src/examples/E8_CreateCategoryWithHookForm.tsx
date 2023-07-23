/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react'

import { Button, Code, Input, Stack } from '@chakra-ui/react'
import slugify from '@sindresorhus/slugify'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { CategoryCreateInput } from '@wsvvrijheid/types'

import { createCategoryWithMutation } from './utils'

export const CreateCategoryWithHookForm = () => {
  const { register, handleSubmit, watch, setValue } =
    useForm<CategoryCreateInput>()

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
    const body = { ...data }
    console.log('body' + JSON.stringify(body))

    mutate(body)
  }

  return (
    <Stack>
      <Code as={'pre'}>{JSON.stringify(data, null, 2)}</Code>
      <Stack as={'form'} onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Category name (en)" {...register('name_en')} />
        {/* TODO: Add all inputs */}
        <Input placeholder="Category name (tr)" {...register('name_tr')} />
        <Input placeholder="Category name (nl)" {...register('name_nl')} />
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
