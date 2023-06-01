import { Meta, StoryObj } from '@storybook/react'

import { PlatformTemplate, PlatformTemplateProps } from './PlatformTemplate'

export default {
  component: PlatformTemplate,
  title: 'Templates/PlatformTemplate',
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
} as Meta<PlatformTemplateProps>

type Story = StoryObj<PlatformTemplateProps>

export const Default: Story = {
  args: {
    seo: {
      title: 'SamenVVV',
    },
    image: '/images/samen-logo.svg',
    link: '/platforms/samenvvv',
  },
}
