import { Button } from '@chakra-ui/react'
import { StoryFn, Meta } from '@storybook/react'

import { Navigate } from './Navigate'

export default {
  component: Navigate,
  title: 'Shared/Navigate',
} as Meta<typeof Navigate>

const Template: StoryFn<typeof Navigate> = args => <Navigate {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Default',
  href: '/',
}

export const AsButtonInternalLink = Template.bind({})
AsButtonInternalLink.args = {
  children: 'Button',
  href: '/button',
  as: Button,
}

export const AsButtonExternalLink = Template.bind({})
AsButtonExternalLink.args = {
  children: 'Button',
  href: 'https://www.google.com',
  as: Button,
  colorScheme: 'primary',
}
