import React from 'react'

import { Story, Meta } from '@storybook/react'

import { Container } from '../../components'
import { NEWS_MOCK } from '../../mocks'
import { NewsCardBase } from './NewsCardBase'
import { NewsCardProps } from './types'

export default {
  title: 'Admin/NewsCardBase',
  component: NewsCardBase,
  args: {
    news: NEWS_MOCK,
  },
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as Meta<NewsCardProps>

const Template: Story<NewsCardProps> = args => {
  return (
    <NewsCardBase
      {...args}
      isFeatured={args.isFeatured}
      variant={args.variant}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  isFeatured: false,
}

export const Featured = Template.bind({})
Featured.args = {
  isFeatured: true,
}

export const Vertical = Template.bind({})
Vertical.args = {
  isFeatured: true,
  variant: 'vertical',
}
