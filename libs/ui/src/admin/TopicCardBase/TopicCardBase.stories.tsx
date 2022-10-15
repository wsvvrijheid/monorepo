// import { Box, SimpleGrid } from '@chakra-ui/react'
import { Story, Meta } from '@storybook/react'

import { Container } from '../../components'
import { TOPICS_MOCK } from '../../mocks'
import { TopicCardBase } from './TopicCardBase'
import { TopicCardBaseProps } from './types'

export default {
  title: 'Admin/TopicCardBase',
  component: TopicCardBase,
  args: {
    topic: TOPICS_MOCK.data.data[0],
  },
  decorators: [
    Story => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} as Meta<TopicCardBaseProps>

const Template: Story<TopicCardBaseProps> = args => {
  return <TopicCardBase {...args} variant={args.variant} />
}

// const GridTemplate: Story = args => {
//   return (
//     <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4}>
//       {[
//         TOPIC_MOCK,
//         TOPIC_MOCK,
//         TOPIC_MOCK,
//         TOPIC_MOCK,
//         TOPIC_MOCK,
//         TOPIC_MOCK,
//         TOPIC_MOCK,
//         TOPIC_MOCK,
//       ].map((news, i) => (
//         <Box key={news.id} gridColumn={i === 0 ? 'span 4' : undefined}>
//           <TopicCardBase
//             variant={i === 0 ? 'horizontal' : 'vertical'}
//             hideDescription={i > 4}
//             news={news}
//             {...args}
//           />
//         </Box>
//       ))}
//     </SimpleGrid>
//   )
// }

export const Default = Template.bind({})

export const Horizontal = Template.bind({})
Horizontal.args = {
  variant: 'horizontal',
}

export const Simple = Template.bind({})
Simple.args = {
  variant: 'vertical',
  hideDescription: true,
}

// export const Grid = GridTemplate.bind({})
// Grid.args = {
//   isBookmarked: false,
// }
