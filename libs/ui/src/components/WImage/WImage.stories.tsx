import { Box, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { Story, Meta } from '@storybook/react'

import { FILE_MOCKS, IMAGE_MOCK } from '../../mocks'
import { Container } from '../Container'
import { WImage, WImageProps } from './WImage'

export default {
  component: WImage,
  title: 'Shared/WImage',
  decorators: [
    Story => (
      <Container maxW="container.md">
        <Story />
      </Container>
    ),
  ],
  args: {
    src: IMAGE_MOCK,
  },
  argTypes: {
    format: {
      control: {
        type: 'select',
        options: ['thumbnail', 'small', 'medium', 'large'],
      },
    },
  },
} as Meta<WImageProps>

// DEFAULT TEMPLATE
const Template: Story<WImageProps> = args => <WImage {...args} />

export const Default = Template.bind({})

export const Zoom = Template.bind({})
Zoom.args = { hasZoom: true }

export const Local = Template.bind({})
Local.args = { src: '/images/samen.jpg' }

export const External = Template.bind({})
External.args = { src: 'https://picsum.photos/200/300' }

export const Width300 = Template.bind({})
Width300.args = { w: 300 }

export const Height300 = Template.bind({})
Height300.args = { h: 300 }

export const BoxSize250 = Template.bind({})
BoxSize250.args = { boxSize: 300 }

export const Twitter = Template.bind({})
Twitter.args = { ratio: 'twitter' }

export const Rounded = Template.bind({})
Rounded.args = { rounded: 'lg' }

// CUSTOM
export const Card = () => (
  <Box p={2} bg="primary.400">
    <WImage src={IMAGE_MOCK} alt="box" ratio={3} />
    <Text>Card content</Text>
  </Box>
)

export const FlexCard = () => (
  <Flex>
    <WImage src={IMAGE_MOCK} alt="flex" />
    <Text>Card content</Text>
  </Flex>
)

export const Float = () => (
  <Box>
    <WImage
      src={IMAGE_MOCK}
      alt="float"
      float="left"
      boxSize="48"
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

export const GridZoom = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing={4} h="full">
      {FILE_MOCKS.filter(file => file.mime.includes('image')).map(file => (
        <VStack shadow="base">
          <WImage src={file} hasZoom={true} alt={''} />
          <Text p={2} noOfLines={1}>
            {file.name}
          </Text>
        </VStack>
      ))}
    </SimpleGrid>
  )
}
