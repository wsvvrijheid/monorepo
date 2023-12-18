import { StoryObj, StoryFn, Meta } from '@storybook/react'

import { Layout, LayoutProps } from './Layout'
import { FOOTER_MENU, HEADER_MENU, SOCIAL_LINKS } from '../../mocks'
import { Hero } from '../Hero/Hero'

export default {
  component: Layout,
  title: 'Layout/Layout',
  args: {
    headerProps: {
      headerMenu: HEADER_MENU,
    },
    logo: 'https://wsvvrijheid.nl/images/logo.svg',
    footerProps: {
      menu: FOOTER_MENU,
      about: 'samenvvv',
      socialItems: SOCIAL_LINKS,
    },
  },
} as Meta<LayoutProps>

type Story = StoryObj<LayoutProps>

export const Default: Story = {}

const StoryWithHero: StoryFn<LayoutProps> = args => (
  <Layout {...args}>
    <Hero
      title="Title"
      image="https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000"
    />
  </Layout>
)

export const WithHero: Story = {
  render: StoryWithHero,
  args: {
    isDark: true,
  },
}
