import { Story, Meta } from '@storybook/react'
import { BLOG_MOCKS } from '@wsvvrijheid/mocks'

import { Container } from '../Container'
import { BlogCard, BlogCardProps } from './BlogCard'

export default {
  component: BlogCard,
  title: 'Shared/BlogCard',
  args: {
    post: BLOG_MOCKS.tr.data[0],
  },
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as Meta<BlogCardProps>

const Template: Story<BlogCardProps> = args => {
  return <BlogCard {...args} />
}

export const Default = Template.bind({})
export const Featured = Template.bind({})
Featured.args = {
  isFeatured: true,
}
