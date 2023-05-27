import { StoryFn, Meta } from '@storybook/react'

import { ShareButtons } from './ShareButtons'

export default {
  component: ShareButtons,
  title: 'Shared/ShareButtons',
} as Meta<typeof ShareButtons>

const Template: StoryFn<typeof ShareButtons> = args => (
  <ShareButtons {...args} />
)

export const Default = Template.bind({})
Default.args = {
  url: 'https://wsvvrijheid.vercel.app/tr/club/arts/yalnizlik',
  title: 'Yalnizlik',
  quote:
    'Karısı ölen bir koca yalnız, annesi ölen bir çocuk yalnız, sevdiklerimiz gidiyor kalıyoruz yalnız.',
}
