import { Box, Grid } from '@chakra-ui/react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Container } from '../Container'
import { CategoryFilterSkeleton } from './CategoryFilterSkeleton'

export default {
  component: CategoryFilterSkeleton,
  title: 'Shared/CategoryFilterSkeleton',
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as ComponentMeta<typeof CategoryFilterSkeleton>

const Template: ComponentStory<typeof CategoryFilterSkeleton> = args => {
  return (
    <Grid gridTemplateColumns="300px 1fr">
      <Box bg="gray.100" p={4}>
        <CategoryFilterSkeleton />
      </Box>
    </Grid>
  )
}

export const Default = Template.bind({})
Default.args = {}
