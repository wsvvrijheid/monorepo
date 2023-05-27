import { StoryFn, Meta } from '@storybook/react'

import { PageTitle } from './PageTitle'

export default {
  component: PageTitle,
  title: 'Shared/PageTitle',
} as Meta<typeof PageTitle>

const Template: StoryFn<typeof PageTitle> = args => <PageTitle {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Page Title',
}
