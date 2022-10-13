/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { CategoryCreateInput } from '@wsvvrijheid/types'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { FormItem } from '../../../components/FormItem'
import { createCategoryWithMutation } from '../createCategoryWithMutation'

type CategoryFormFields = Pick<
  CategoryCreateInput,
  'name_en' | 'name_nl' | 'name_tr'
>

const schema = yup.object({
  name_en: yup.string().min(5, 'Min 5 characters').required(),
  name_nl: yup.string().min(5, 'Min 5 characters').required(),
  name_tr: yup.string().min(5, 'Min 5 characters').required(),
})

export const UseMutation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormFields>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const { mutate, data, isLoading } = useMutation({
    mutationKey: ['create-category'],
    mutationFn: createCategoryWithMutation,
  })

  const handleSubmitForm = async (data: CategoryFormFields) => {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      {/* TODO: Add input fields for `name_en`, `name_tr` and `name_nl` */}
      {/* Regular input */}

      <FormItem
        name="name_en"
        label="Name EN"
        register={register}
        errors={errors}
      />
      <FormItem
        name="name_nl"
        label="Name NL"
        register={register}
        errors={errors}
      />
      <FormItem
        name="name_tr"
        label="Name NL"
        register={register}
        errors={errors}
      />
      <Button type="submit">S</Button>
    </form>
  )
}
