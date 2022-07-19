import { ComponentStory, ComponentMeta } from '@storybook/react'

import { FOOTER_MENU, HEADER_MENU, PROFILE, SOCIAL_LINKS } from '../../mocks'
import { Hero } from '../Hero/Hero'
import { Layout } from './Layout'

export default {
  component: Layout,
  title: 'Layout/Layout',
  args: {
    headerProps: {
      headerMenu: HEADER_MENU,
      profileMenu: PROFILE,
    },
    logo: 'https://wsvvrijheid.nl/images/logo.svg',
    footerProps: {
      menu: FOOTER_MENU,
      about: 'About',
      socialItems: SOCIAL_LINKS,
    },
  },
} as ComponentMeta<typeof Layout>

const Template: ComponentStory<typeof Layout> = args => <Layout {...args} />
const TemplateHero: ComponentStory<typeof Layout> = args => (
  <Layout {...args} isDark>
    <Hero
      title="Title"
      image="https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000"
    />
  </Layout>
)

export const Default = Template.bind({})
export const WithHero = TemplateHero.bind({})
