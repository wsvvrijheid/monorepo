import { Box, Flex } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import { FOOTER_MENU, SOCIAL_LINKS } from '../../../mocks'
import { Footer } from '../Footer'
import { FooterProps } from '../types'

export default {
  component: Footer,
  title: 'Layout/Footer',
  decorators: [
    Story => (
      <Flex bg="gray.300" minH="100vh" align="end">
        <Box w="full">
          <Story />
        </Box>
      </Flex>
    ),
  ],
} as Meta<FooterProps>

const Template: Story<FooterProps> = args => <Footer {...args} />

export const Default = Template.bind({})
Default.args = {
  menu: FOOTER_MENU,
  about: 'About',
  logo: 'https://wsvvrijheid.nl/images/logo.svg',
  socialItems: SOCIAL_LINKS,
}
