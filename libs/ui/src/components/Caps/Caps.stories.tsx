import { Meta, Story } from '@storybook/react'

import { Caps } from './Caps'
import { CapsProps } from './types'

export default {
  title: 'Shared/Caps',
  component: Caps,
} as Meta<CapsProps>

const Template: Story<CapsProps> = args => <Caps {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Example Title',
  text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum nemo sunt, eaque, voluptas laborum ut, doloribus fuga dolores sit aliquid quisquam beatae. Hic cumque enim autem odio quae perferendis porro.',
  image: 'https://picsum.photos/200/300',
  shape:
    'M45 675H55L55 8.74228e-07L45 0C15.021 168.507 0.0209643 252.819 2.18987e-05 337.135C-0.0209205 421.569 14.9791 506.007 45 675Z',
  bg: 'white',
  color: 'black',
  flip: true,
  hasLine: true,
  scale: 0.5,
}
