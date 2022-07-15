import { ComponentStory, ComponentMeta } from '@storybook/react';
import { HEADER_MENU } from '../../../mocks';
import { HeaderNav } from '../HeaderNav';

export default {
  component: HeaderNav,
  title: 'Layout/HeaderNav',
} as ComponentMeta<typeof HeaderNav>;

const Template: ComponentStory<typeof HeaderNav> = (args) => (
  <HeaderNav {...args} />
);

export const Default = Template.bind({});
Default.args = {
  menu: HEADER_MENU,
};
