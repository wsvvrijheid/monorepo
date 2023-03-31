import { Box, Grid } from '@chakra-ui/react'
import { ComponentMeta, Story } from '@storybook/react'
import { USER_MOCKS } from '@wsvvrijheid/mocks'
import { mapSessionUser } from '@wsvvrijheid/utils'
import { sample } from 'lodash'

import { AdminNav } from './AdminNav'

const sessionUser = mapSessionUser(sample(USER_MOCKS)!)

export default {
  title: 'Admin/AdminNav',
  component: AdminNav,
  args: {
    user: sessionUser,
  },
  parameters: {
    nextRouter: {
      asPath: sample('/translates'),
    },
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
} as unknown as ComponentMeta<typeof AdminNav>

const Template: Story = args => {
  return <AdminNav user={sessionUser} {...args} />
}

export const Default = Template.bind({})
export const Expanded = Template.bind({})
Expanded.args = {
  expanded: true,
}
