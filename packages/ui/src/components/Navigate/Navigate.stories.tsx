import { Button } from '@chakra-ui/react'
import { StoryObj, Meta } from '@storybook/react'

import { Navigate } from './Navigate'

export default {
  component: Navigate,
  title: 'Shared/Navigate',
} as Meta<typeof Navigate>

type Story = StoryObj<typeof Navigate>

export const Default: Story = {
  args: {
    children: 'Default',
    href: '/',
  },
}

export const AsButtonInternalLink: Story = {
  args: {
    children: 'Button',
    href: '/button',
    as: Button,
  },
}

export const AsButtonExternalLink: Story = {
  args: {
    children: 'Button',
    href: 'https://www.google.com',
    as: Button,
    colorScheme: 'primary',
  },
}
