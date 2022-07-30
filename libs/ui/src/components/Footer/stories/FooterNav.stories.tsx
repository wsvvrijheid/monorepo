import { Box } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import { FOOTER_MENU } from '../../../mocks'
import { FooterNav } from '../FooterNav'
import { FooterNavProps } from '../types'

export default {
  component: FooterNav,
  title: 'Layout/FooterNav',
  decorators: [
    Story => (
      <Box bg="primary.900">
        <Story />
      </Box>
    ),
  ],
} as Meta<FooterNavProps>

const Template: Story<FooterNavProps> = args => <FooterNav {...args} />

export const Default = Template.bind({})
Default.args = {
  menu: FOOTER_MENU,
}
