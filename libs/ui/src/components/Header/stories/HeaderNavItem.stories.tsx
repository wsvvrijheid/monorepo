import { Story, Meta } from '@storybook/react'

import { HeaderNavItem } from '../HeaderNavItem'
import { HeaderNavItemProps } from '../types'

export default {
  component: HeaderNavItem,
  title: 'Layout/HeaderNavItem',
} as Meta<HeaderNavItemProps>

const Template: Story<HeaderNavItemProps> = args => <HeaderNavItem {...args} />

export const Default = Template.bind({})
Default.args = {
  item: { link: '/events', en: 'Events', nl: 'Evenementen', tr: 'Etkinlikler' },
}

export const Parent = Template.bind({})
Parent.args = {
  item: {
    en: 'Events',
    nl: 'Evenementen',
    tr: 'Etkinlikler',

    children: [
      { link: '/events', en: 'Events', nl: 'Evenementen', tr: 'Etkinlikler' },
    ],
  },
}
