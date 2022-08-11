import { Onboarding } from './StackExample'

export default {
  component: Onboarding,
  title: 'Example/StackExample',
}

const Template = args => <Onboarding {...args} />

export const Default = Template.bind({})
Default.args = {}
