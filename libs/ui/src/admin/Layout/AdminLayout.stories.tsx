import { Box } from '@chakra-ui/react'
import { Story, Meta } from '@storybook/react'
import { USER_MOCKS } from '@wsvvrijheid/mocks'
import { mapSessionUser } from '@wsvvrijheid/utils'
import { sample } from 'lodash'

import { AdminLayout, AdminLayoutProps } from './AdminLayout'

const sessionUser = mapSessionUser(sample(USER_MOCKS))

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

export const Editor = Template.bind({})
Editor.args = {
  user: {
    ...sessionUser,
    isEditor: true,
  },
} as AdminLayoutProps

export const Admin = Template.bind({})
Admin.args = {
  user: {
    ...sessionUser,
    isAdmin: true,
  },
} as AdminLayoutProps

export const Translator = Template.bind({})
Translator.args = {
  user: {
    ...sessionUser,
    translatorId: 1,
  },
} as AdminLayoutProps
