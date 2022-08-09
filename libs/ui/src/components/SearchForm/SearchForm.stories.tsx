import { Story, Meta } from '@storybook/react'

import { SearchForm } from '.'
import { SearchFormProps } from './types'

export default {
  title: 'Forms/SearchForm',
  component: SearchForm,
} as Meta<typeof SearchForm>

const Template: Story<SearchFormProps> = args => {
  return <SearchForm {...args} />
}

export const Default = Template.bind({})
Default.args = {}
