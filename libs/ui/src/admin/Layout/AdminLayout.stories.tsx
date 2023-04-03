import { Box } from '@chakra-ui/react'
import { Story, Meta } from '@storybook/react'
import { sample } from 'lodash'

import { USER_MOCKS } from '@wsvvrijheid/mocks'
import { mapSessionUser } from '@wsvvrijheid/utils'

import { AdminLayout, AdminLayoutProps } from './AdminLayout'

const sessionUser = mapSessionUser(sample(USER_MOCKS)!)

export default {
  title: 'Admin/AdminLayout',
  component: AdminLayout,
  args: {
    user: sessionUser,
    title: 'Admin',
  },
  decorators: [
    Story => (
      <Box m={0} p={0} pos="absolute" top={0} left={0} w="full" h="full">
        <Story />
      </Box>
    ),
  ],
} as Meta<AdminLayoutProps>

const Template: Story<AdminLayoutProps> = args => {
  return <AdminLayout {...args} />
}

export const Default = Template.bind({})

export const Loading = Template.bind({})
Loading.args = {
  isLoading: true,
} as AdminLayoutProps
