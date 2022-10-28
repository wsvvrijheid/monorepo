import { ComponentStory, ComponentMeta } from '@storybook/react'

import { AdminLoginForm } from './AdminLoginForm'
export default {
  component: AdminLoginForm,
  title: 'Admin/AdminLoginForm',
} as unknown as ComponentMeta<typeof AdminLoginForm>

const Template: ComponentStory<typeof AdminLoginForm> = () => <AdminLoginForm />

export const Default = Template.bind({})
