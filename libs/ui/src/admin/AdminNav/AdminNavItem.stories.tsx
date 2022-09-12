import { ComponentMeta, Story } from '@storybook/react'
import { USER_MOCKS } from '@wsvvrijheid/mocks'
import { mapSessionUser } from '@wsvvrijheid/utils'
import { sample } from 'lodash'

import { Container } from '../../components'
import { getAdminNav } from './AdminNav'
import { AdminNavItem } from './AdminNavItem'
import { AdminNavItemProps } from './types'

const navItems = getAdminNav(mapSessionUser(sample(USER_MOCKS)))
const navItem = sample(navItems)

export default {
  title: 'Admin/AdminNavItem',
  component: AdminNavItem,
  args: {
    label: navItem.label,
    link: navItem?.link,
    submenu: navItem?.submenu?.map(submenu => ({
      label: submenu.label,
      link: submenu.link,
      icon: submenu.icon,
    })),
    icon: navItems[0]?.icon,
  },
  decorators: [
    Story => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} as unknown as ComponentMeta<typeof AdminNavItem>

const Template: Story = (args: AdminNavItemProps) => {
  return <AdminNavItem {...args} />
}

export const Default = Template.bind({})
