import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PageTitle } from './PageTitle';

export default {
  component: PageTitle,
  title: 'Shared/PageTitle',
} as ComponentMeta<typeof PageTitle>;

const Template: ComponentStory<typeof PageTitle> = (args) => (
  <PageTitle {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: 'Page Title',
};
