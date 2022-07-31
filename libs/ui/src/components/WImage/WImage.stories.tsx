import { Box } from '@chakra-ui/react'
import { Story, Meta } from '@storybook/react'

import { IMAGE_MOCK } from '../../mocks'
import { WImage, WImageProps } from './WImage'

export default {
  component: WImage,
  title: 'Shared/WImage',
  argTypes: {
    format: {
      control: {
        type: 'select',
        options: ['thumbnail', 'small', 'medium', 'large'],
      },
    },
  },
} as Meta<WImageProps>

const Template: Story<WImageProps> = args => <WImage {...args} />
const Wrapper: Story<WImageProps> = args => (
  <Box p={2} bg="primary.400">
    <WImage {...args} />
  </Box>
)

export const Default = Template.bind({})
Default.args = {
  image: IMAGE_MOCK,
}

export const Local = Template.bind({})
Local.args = {
  image: '/assets/images/samenvvv.jpg',
}

export const External = Template.bind({})
External.args = {
  image: 'https://picsum.photos/200/300',
  layout: 'fill',
}

export const Card = Wrapper.bind({})
Card.args = {
  image: IMAGE_MOCK,
  ratio: 3 / 1,
  // layout: 'fill',
  // width: 300,
  // height: 120,
}
