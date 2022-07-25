import { yupResolver } from '@hookform/resolvers/yup'
import { Story, Meta } from '@storybook/react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { WSelect, WSelectProps } from './WSelect'

const options = [
  { label: 'Category 1', value: '1' },
  { label: 'Category 2', value: '2' },
  { label: 'Category 3', value: '3' },
]

export default {
  title: 'Forms/WSelect',
  component: WSelect,
} as Meta<WSelectProps>

const categorySchema = yup.object().shape({
  label: yup.string(),
  value: yup.string(),
})

const objectSchema = yup.object({
  category: categorySchema,
})

const arraySchema = yup.object({
  categories: yup.array().of(categorySchema),
})

const Template: Story<WSelectProps> = args => {
  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(objectSchema),
    mode: 'all',
  })

  return (
    <WSelect
      {...args}
      name="category"
      errors={errors}
      control={control}
      options={options}
      colorScheme="primary"
      placeholder="Select a category"
    />
  )
}

const MultiTemplate: Story<WSelectProps> = args => {
  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(arraySchema),
    mode: 'all',
  })

  return (
    <WSelect
      {...args}
      name="categories"
      errors={errors}
      control={control}
      options={options}
      isMulti
      colorScheme="primary"
      placeholder="Select categories"
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  label: 'Default',
}

export const Check = Template.bind({})
Check.args = {
  label: 'Check',
  selectedOptionStyle: 'check',
}

export const Color = Template.bind({})
Color.args = {
  label: 'Color',
  selectedOptionStyle: 'color',
  selectedOptionColor: 'red',
}

export const Multi = MultiTemplate.bind({})
Multi.args = {
  label: 'Multi',
}

export const MultiCheck = MultiTemplate.bind({})
MultiCheck.args = {
  label: 'Multi Check',
  selectedOptionStyle: 'check',
  closeMenuOnSelect: false,
  hideSelectedOptions: false,
}

export const MultiColor = MultiTemplate.bind({})
MultiColor.args = {
  label: 'Multi Color',
  selectedOptionStyle: 'color',
  selectedOptionColor: 'purple',
  closeMenuOnSelect: false,
  hideSelectedOptions: false,
}
