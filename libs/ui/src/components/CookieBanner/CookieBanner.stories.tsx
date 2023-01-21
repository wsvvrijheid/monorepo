import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CookieBanner } from './CookieBanner'
import { Container } from '../Container'

export default {
  component: CookieBanner,
  title: 'Shared/CookieBanner',
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as ComponentMeta<typeof CookieBanner>

const Template: ComponentStory<typeof CookieBanner> = () => {
  // const onClose = () => alert('Close')
  const onAllow = () => alert('Allow')
  // const onReject = () => alert('Reject')

  return (
    <Box position="relative" minH="600px">
      <CookieBanner
        position="absolute"
        bottom="0"
        right="0"
        left="0"
        // onClose={onClose}
        onAllow={onAllow}
        // onReject={onReject}
      />
    </Box>
  )
}

export const Default = Template.bind({})
