import { Spinner } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useActivity } from '@wsvvrijheid/utils'

import { Activity } from './Activity'

export default {
  title: 'Compaunds/Activity',
  component: Activity,
} as ComponentMeta<typeof Activity>

const Template: ComponentStory<typeof Activity> = () => {
  const { data, isLoading } = useActivity('san')

  console.log('data', data)

  if (isLoading) return <Spinner />

  return <Activity title={data?.title} />
}

export const Default = Template.bind({})
