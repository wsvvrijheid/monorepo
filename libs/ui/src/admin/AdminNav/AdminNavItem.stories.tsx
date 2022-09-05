import { ComponentMeta, Story } from '@storybook/react'

import { Container } from '../../components'
import { navItems } from './AdminNav'
import { AdminNavItem } from './AdminNavItem'

export default {
  title: 'Admin/AdminNavItem',
  component: AdminNavItem,
  args: {
    label: navItems[2].label,
    link: navItems[2]?.link,
    submenu: navItems[2]?.submenu?.map(submenu => ({
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

const Template: Story = args => {
  const { label, link, submenu, icon } = args
  console.log('admin nav', args)
  return (
    <AdminNavItem
      label={label}
      link={link}
      submenu={submenu}
      icon={icon}
      {...args}
    />
  )
}

export const Default = Template.bind({})
