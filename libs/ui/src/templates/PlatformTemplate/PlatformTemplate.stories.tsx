import { Story, Meta } from '@storybook/react'

import { SOURCE_MOCKS } from '../../mocks'
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
  source: SOURCE_MOCKS.platforms.samenvvv,
  image: 'https://api.wsvvrijheid.nl/uploads/samenvvv_32898faefb.svg',
  link: '/platforms/samenvvv',
}
