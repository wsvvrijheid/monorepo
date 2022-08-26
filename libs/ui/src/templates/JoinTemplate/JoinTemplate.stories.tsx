import { Story, Meta } from '@storybook/react'

import { JoinTemplate, JoinTemplateProps } from '.'

export default {
  component: JoinTemplate,
  title: 'Templates/JoinTemplate',
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
} as Meta<JoinTemplateProps>

const Template: Story<JoinTemplateProps> = args => {
  return <JoinTemplate {...args} />
}

export const Default = Template.bind({})
Default.args = {
  title: 'SamenVVV',
}
