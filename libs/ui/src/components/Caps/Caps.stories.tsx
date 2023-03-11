import { Meta, Story } from '@storybook/react'
import { OgImageParams } from '@wsvvrijheid/types'

import { Caps } from './Caps'
import { CapsProps } from './types'

export default {
  title: 'Shared/Caps',
  component: Caps,
} as Meta<OgImageParams>

const Template: Story<CapsProps> = args => <Caps {...args} />

const args = {
  title: 'Example Title',
  text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum nemo sunt, eaque, voluptas laborum ut, doloribus fuga dolores sit aliquid quisquam beatae. Hic cumque enim autem odio quae perferendis porro.',
  image: 'https://picsum.photos/200/300',
  shape: 0,
  bg: 'white',
  color: 'black',
  flip: true,
  hasLine: true,
  scale: 0.5,
}

export const Default = Template.bind({})

Default.args = {
  imageParams: args,
}
