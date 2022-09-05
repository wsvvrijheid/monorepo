import { useState, useEffect } from 'react'

import { Meta, Story } from '@storybook/react'
import { ACTIVITY_MOCKS } from '@wsvvrijheid/mocks'
import { serialize } from 'next-mdx-remote/serialize'

import { Container } from '../Container'
import { ActivityDetail, ActivityDetailProps } from './ActivitiyDetail'
export default {
  component: ActivityDetail,
  title: 'Shared/ActivityDetail',
  args: {
    activity: ACTIVITY_MOCKS.tr.data[0],
    title: ACTIVITY_MOCKS.tr.data[0].title,
    image: ACTIVITY_MOCKS.tr.data[0].image,
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
} as Meta<ActivityDetailProps>

const Template: Story<ActivityDetailProps> = args => {
  const [source, setSource] = useState(null)
  const getSource = async content => {
    const s = await serialize(content || '')
    setSource(s)
  }

  useEffect(() => {
    getSource(args?.activity?.content)
  }, [])
  return <ActivityDetail {...args} source={source} />
}

export const Default = Template.bind({})
Default.args = {}
