import { Box, Grid } from '@chakra-ui/react'
import { Meta, StoryFn } from '@storybook/react'
import { sample } from 'lodash'

import { USER_MOCKS } from '@wsvvrijheid/mocks'
import { mapSessionUser } from '@wsvvrijheid/utils'

import { AdminNav } from './AdminNav'

const sessionUser = mapSessionUser(sample(USER_MOCKS)!)

export default {
  title: 'Admin/AdminNav',
  component: AdminNav,
  args: {
    user: sessionUser,
  },
  decorators: [
    (Story: any) => (
      <Grid gridTemplateColumns="300px 1fr" bg="gray.100">
        <Box bg="white">
          <Story />
        </Box>
      </Grid>
    ),
  ],
} as Meta<typeof AdminNav>

const Template: StoryFn = args => {
  return <AdminNav user={sessionUser} {...args} />
}

export const Default = Template.bind({})
export const Expanded = Template.bind({})
Expanded.args = {
  expanded: true,
}
