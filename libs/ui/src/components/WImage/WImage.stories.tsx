import { Box } from '@chakra-ui/react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { IMAGE } from '../../mocks'
import { WImage } from './WImage'

export default {
  component: WImage,
  title: 'Shared/ChakraImage',
} as ComponentMeta<typeof WImage>

const Template: ComponentStory<typeof WImage> = args => <WImage {...args} />
const Wrapper: ComponentStory<typeof WImage> = args => (
  <Box p={2} bg="primary.400">
    <WImage {...args} />
  </Box>
)

export const Default = Template.bind({})
Default.args = {
  image: IMAGE,
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
  image: IMAGE,
  ratio: 3 / 1,
  // layout: 'fill',
  // width: 300,
  // height: 120,
}
