import { ComponentStory, ComponentMeta } from '@storybook/react';
import { HEADER_MENU } from '../../../mocks';
import { HeaderMobileNav } from '../HeaderMobileNav';

export default {
  component: HeaderMobileNav,
  title: 'Layout/HeaderMobileNav',
} as ComponentMeta<typeof HeaderMobileNav>;

const Template: ComponentStory<typeof HeaderMobileNav> = (args) => (
  <HeaderMobileNav {...args} />
);

export const Default = Template.bind({});
Default.args = {
  headerMenu: HEADER_MENU,
};
