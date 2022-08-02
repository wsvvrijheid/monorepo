import { Story, Meta } from '@storybook/react'

import { SOURCE_MOCKS } from '../../mocks'
import { ProjectTemplate, ProjectTemplateProps } from './ProjectTemplate'

export default {
  component: ProjectTemplate,
  title: 'Templates/ProjectTemplate',
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
} as Meta<ProjectTemplateProps>

const Template: Story<ProjectTemplateProps> = args => {
  return <ProjectTemplate {...args} />
}

export const Default = Template.bind({})
Default.args = {
  seo: {
    title: 'SamenVVV',
  },
  source: SOURCE_MOCKS.platforms.samenvvv,
  image: 'https://www.samenvvv.nl/samenvvv-logo.svg',
  link: '/platforms/samenvvv',
}
