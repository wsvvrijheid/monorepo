import { Meta, Story } from '@storybook/react'

import { PlatformTemplate, PlatformTemplateProps } from './PlatformTemplate'

export default {
  component: PlatformTemplate,
  title: 'Templates/PlatformTemplate',
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
} as Meta<PlatformTemplateProps>

const Template: Story<PlatformTemplateProps> = args => {
  return <PlatformTemplate {...args} />
}

export const Default = Template.bind({})
Default.args = {
  seo: {
    title: 'SamenVVV',
  },
  image: '/images/samen-logo.svg',
  link: '/platforms/samenvvv',
}
