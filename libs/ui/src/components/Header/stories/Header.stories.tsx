import { ComponentStory, ComponentMeta } from '@storybook/react'

import { HEADER_MENU, PROFILE } from '../../../mocks'
import { Header } from '../Header'

export default {
  component: Header,
  title: 'Layout/Header',
  args: {
    headerMenu: HEADER_MENU,
    profileMenu: PROFILE,
    logo: 'https://wsvvrijheid.nl/images/logo.svg',
  },
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = args => <Header {...args} />

export const Default = Template.bind({})

export const IsLoggedIn = Template.bind({})
IsLoggedIn.args = {
  profileMenu: { ...PROFILE, isLoggedIn: true },
  isLoggedIn: true,
}
