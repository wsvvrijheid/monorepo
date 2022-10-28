import { Box, Grid } from '@chakra-ui/react'
import { ComponentMeta, Story } from '@storybook/react'
import { USER_MOCKS } from '@wsvvrijheid/mocks'
import { mapSessionUser } from '@wsvvrijheid/utils'
import { sample } from 'lodash'

import { AdminNav, getAdminNav } from './AdminNav'

const sessionUser = mapSessionUser(sample(USER_MOCKS)!)
const adminNav = getAdminNav(sessionUser)

const navLinks = adminNav.flatMap(item => [
  item.link,
  ...(item.submenu?.map(sub => sub.link) ?? []),
])

export default {
  title: 'Admin/AdminNav',
  component: AdminNav,
  args: {
    navItems: adminNav,
    user: sessionUser,
  },
  parameters: {
    nextRouter: {
      asPath: sample(navLinks),
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
