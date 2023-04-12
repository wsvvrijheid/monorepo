import { Meta } from '@storybook/react'

import { AdminNavItem } from './AdminNavItem'
import { AdminNavItemProps } from './types'
import { Container } from '../../components'

export default {
  title: 'Admin/AdminNavItem',
  component: AdminNavItem,
  args: {
    label: 'Test',
    link: '/',
    visible: true,
    submenu: [
      {
        label: 'Test',
        link: '/',
        icon: <></>,
        visible: true,
        submenu: [],
      },
    ],
  },
  decorators: [
    (Story: any) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} as Meta<typeof AdminNavItem>

const Template = (args: AdminNavItemProps) => {
  return <AdminNavItem {...args} />
}

export const Default = Template.bind({})
