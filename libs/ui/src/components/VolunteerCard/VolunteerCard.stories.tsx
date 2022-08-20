import { SimpleGrid } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'
import { VOLUNTEER_MOCKS } from '@wsvvrijheid/mocks'

import { VolunteerCard, VolunteerCardProps } from './VolunteerCard'

export default {
  component: VolunteerCard,
  title: 'Shared/VolunteerCard',
} as Meta<VolunteerCardProps>

const Template: Story<VolunteerCardProps> = args => (
  <SimpleGrid columns={3} gap={4}>
    {VOLUNTEER_MOCKS.data.map(volunteer => (
      <VolunteerCard key={volunteer.id} volunteer={volunteer} />
    ))}
  </SimpleGrid>
)

export const Default = Template.bind({})
Default.args = {}
