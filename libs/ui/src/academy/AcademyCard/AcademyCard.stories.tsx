import { SimpleGrid } from '@chakra-ui/react'
import { Meta, StoryFn } from '@storybook/react'

import { AcademyCard } from './AcademyCard'
import { Container } from '../../components/Container'

export default {
  component: AcademyCard,
  title: 'Shared/AcademyCard',
  decorators: [
    Story => (
      <Container maxW="container.lg">
        <Story />
      </Container>
    ),
  ],
} as Meta<typeof AcademyCard>

const Template: StoryFn<typeof AcademyCard> = args => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4}>
      <AcademyCard {...args}>{args.children}</AcademyCard>
      <AcademyCard {...args}>{args.children}</AcademyCard>
      <AcademyCard {...args}>{args.children}</AcademyCard>
    </SimpleGrid>
  )
}

export const Default = Template.bind({})
Default.args = {
  children: 'Projects',
  image: 'https://placehold.co/256x',
  href: '/',
}
export const withDescription = Template.bind({})
withDescription.args = {
  children: 'Projects',
  image: 'https://placehold.co/256x',
  href: '/',
  description:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo nulla expedita sunt magnam sequi.',
}
