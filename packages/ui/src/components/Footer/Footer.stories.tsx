import { Box, Flex } from '@chakra-ui/react'
import { Meta, StoryObj } from '@storybook/react'

import { Footer } from './Footer'
import { FooterProps } from './types'
import { FOOTER_MENU, SOCIAL_LINKS } from '../../mocks'

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

type Story = StoryObj<FooterProps>

export const Default: Story = {
  args: {
    menu: FOOTER_MENU,
    about: 'samenvvv',
    logo: 'https://wsvvrijheid.nl/images/logo.svg',
    socialItems: SOCIAL_LINKS,
  },
}
