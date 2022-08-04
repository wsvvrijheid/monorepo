import { Story, Meta } from '@storybook/react'

import { Hero, HeroProps } from './Hero'

export default {
  component: Hero,
  title: 'Layout/Hero',
  args: {
    image:
      'https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000',
  },
} as Meta<HeroProps>

const Template: Story<HeroProps> = args => <Hero {...args} />

export const Default = Template.bind({})

export const FullHeight = Template.bind({})
FullHeight.args = {
  isFullHeight: true,
}
