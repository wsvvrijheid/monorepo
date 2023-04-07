import { Meta, StoryFn } from '@storybook/react'

import { AcademyCard } from './AcademyCard'
import { Container } from '../../components/Container'

export default {
  component: AcademyCard,
  title: 'Shared/AcademyCard',
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as Meta<typeof AcademyCard>

const Template: StoryFn<typeof AcademyCard> = args => {
  return <AcademyCard {...args}>{args.children}</AcademyCard>
}

export const Default = Template.bind({})
Default.args = {
  children: 'Courses',
  image: 'https://placehold.co/256x',
  href: '/',
}
export const withDescription = Template.bind({})
withDescription.args = {
  children: 'Courses',
  image: 'https://placehold.co/256x',
  href: '/',
  description:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo nulla expedita sunt magnam sequi, at veniam soluta aliquam itaque inventore id. Tempore itaque fuga cupiditate? Ea soluta iste vel sint!,Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo nulla expedita sunt magnam sequi, at veniam soluta aliquam itaque inventore id. Tempore itaque fuga cupiditate? Ea soluta iste vel sint!,',
}
