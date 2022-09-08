import { Container, Box } from '@chakra-ui/react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { LoginFormFieldValues } from '../../components'
import { AdminLoginForm } from './AdminLoginForm'
export default {
  component: AdminLoginForm,
  title: 'Admin/ArtApprovalModal',
  args: {},
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as unknown as ComponentMeta<typeof AdminLoginForm>

const Template: ComponentStory<typeof AdminLoginForm> = args => {
  return (
    <Box>
      <AdminLoginForm
        onSubmitHandler={function (data: LoginFormFieldValues): void {
          throw new Error('Function not implemented.')
        }}
      />
    </Box>
  )
}

export const Default = Template.bind({})
Default.args = {
  hasZoom: true,
}
