import { StoryFn, Meta } from '@storybook/react'

import { AdminLoginForm } from './AdminLoginForm'

export default {
  component: AdminLoginForm,
  title: 'Admin/AdminLoginForm',
} as Meta<typeof AdminLoginForm>

const Template: StoryFn<typeof AdminLoginForm> = () => <AdminLoginForm />

export const Default = Template.bind({})
