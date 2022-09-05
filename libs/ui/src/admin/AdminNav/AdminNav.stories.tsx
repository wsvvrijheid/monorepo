import { Box, Grid } from '@chakra-ui/react'
import { ComponentMeta, Story } from '@storybook/react'
import { sample } from 'lodash'

import { AdminNav, navItems } from './AdminNav'

const navLinks = navItems.flatMap(item => [
  item.link,
  ...(item.submenu?.map(sub => sub.link) ?? []),
])

export default {
  title: 'Admin/AdminNav',
  component: AdminNav,
  args: {
    navItems: navItems,
  },
  parameters: {
    nextRouter: {
      asPath: sample(navLinks),
    },
  },
  decorators: [
    Story => (
      <Grid gridTemplateColumns="300px 1fr" bg="gray.100">
        <Box bg="white">
          <Story />
        </Box>
      </Grid>
    ),
  ],
} as unknown as ComponentMeta<typeof AdminNav>

const Template: Story = args => {
  return <AdminNav {...args} />
}

export const Default = Template.bind({})
