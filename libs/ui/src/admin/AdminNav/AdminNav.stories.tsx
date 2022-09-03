import { ComponentMeta, Story } from '@storybook/react'

import { Container } from '../../components'
import { AdminNav, navItems } from './AdminNav'

export default {
  title: 'Admin/AdminNav',
  component: AdminNav,
  args: {
    navItems: navItems,
  },
  decorators: [
    Story => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} as unknown as ComponentMeta<typeof AdminNav>

const Template: Story = args => {
  return <AdminNav {...args} />
}

export const Default = Template.bind({})
