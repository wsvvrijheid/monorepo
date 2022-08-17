import { Box, Flex, Text } from '@chakra-ui/react'
import { Story, Meta } from '@storybook/react'

import { IMAGE_MOCK } from '../../mocks'
import { Container } from '../Container'
import { WImage, WImageProps } from './WImage'

export default {
  component: WImage,
  title: 'Shared/WImage',
  decorators: [
    Story => (
      <Container maxW="container.lg">
        <Story />
      </Container>
    ),
  ],
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
    <Text>Card content</Text>
  </Box>
)
const FlexWrapper: Story<WImageProps> = args => (
  <Flex>
    <WImage {...args} />
    <Text>Card content</Text>
  </Flex>
)

const FloatWrapper: Story<WImageProps> = args => (
  <Box>
    <WImage
      {...args}
      float="left"
      w={'80px'}
      h={'80px'}
      mr={4}
      rounded="full"
    />
    <Text>
      At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
      praesentium voluptatum deleniti atque corrupti quos dolores et quas
      molestias excepturi sint occaecati cupiditate non provident, similique
      sunt in culpa qui officia deserunt mollitia animi, id est laborum et
      dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
      Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
      impedit quo minus id quod maxime placeat facere possimus, omnis voluptas
      assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut
      officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates
      repudiandae sint et molestiae non recusandae. Itaque earum rerum hic
      tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
      consequatur aut perferendis doloribus asperiores repellat.
    </Text>
  </Box>
)

// TEMPLATE
export const Default = Template.bind({})
Default.args = {
  image: IMAGE_MOCK,
}

export const Local = Template.bind({})
Local.args = {
  image: '/images/samenvvv.jpg',
}

export const Height300 = Template.bind({})
Height300.args = {
  image: 'https://picsum.photos/200/300',
  h: '300px',
}

export const Width300 = Template.bind({})
Width300.args = {
  image: 'https://picsum.photos/200/300',
  w: '300px',
}

export const WidthHeight300 = Template.bind({})
WidthHeight300.args = {
  image: 'https://picsum.photos/200/300',
  w: '300px',
  h: '300px',
}

export const Twitter = Template.bind({})
Twitter.args = {
  image: 'https://picsum.photos/200/300',
  ratio: 'twitter',
}

export const Rounded = Template.bind({})
Rounded.args = {
  image: 'https://picsum.photos/200/300',
  rounded: 'lg',
}

// BOX WRAPPER
export const Card = Wrapper.bind({})
Card.args = {
  image: IMAGE_MOCK,
  ratio: 3 / 1,
}

// FLEX WRAPPER
export const InFlex = FlexWrapper.bind({})
InFlex.args = {
  image: IMAGE_MOCK,
}

// FLOAT WRAPPER
export const Float = FloatWrapper.bind({})
Float.args = {
  image: IMAGE_MOCK,
}
