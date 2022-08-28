import { Story, Meta } from '@storybook/react'
import { JOB_MOCKS, VOLUNTEER_MOCKS } from '@wsvvrijheid/mocks'

import {
  VolunteersTemplate,
  VolunteersTemplateProps,
} from './VolunteersTemplate'

export default {
  component: VolunteersTemplate,
  title: 'Templates/VolunteersTemplate',
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
} as Meta<VolunteersTemplateProps>

const Template: Story<VolunteersTemplateProps> = args => {
  return <VolunteersTemplate {...args} />
}

export const Default = Template.bind({})
Default.args = {
  seo: {
    title: 'SamenVVV',
  },
  volunteers: VOLUNTEER_MOCKS.data,
  jobs: JOB_MOCKS.data,
}
