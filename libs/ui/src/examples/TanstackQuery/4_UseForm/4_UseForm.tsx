import { Button, Input } from '@chakra-ui/react'
import { CategoryCreateInput } from '@wsvvrijheid/types'
import { useForm } from 'react-hook-form'

import { FormItem } from '../../../components/FormItem'

type CategoryFormFields = Pick<
  CategoryCreateInput,
  'name_en' | 'name_nl' | 'name_tr'
>

export const UseForm = () => {
  const { register, handleSubmit } = useForm<CategoryFormFields>({
    mode: 'onBlur',
  })

  const handleSubmitForm = async (data: CategoryFormFields) => {
    console.log('DATA', data)
    // TODO: Call the mutation function (createCategoryWithMutation) with the input values from the state
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      {/* TODO: Add input fields for `name_en`, `name_tr` and `name_nl` */}
      {/* Regular input */}
      <Input {...register('name_en', { min: 5 })} placeholder="Name EN" />
      <Input {...register('name_nl', { min: 5 })} placeholder="Name NL" />

      {/* Custom Component if use use schema */}
      <FormItem register={register} name="name_tr" errors={{}} />
      <Button type="submit">S</Button>
    </form>
  )
}
