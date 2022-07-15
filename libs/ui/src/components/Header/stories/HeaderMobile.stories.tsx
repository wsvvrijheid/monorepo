import { ComponentStory, ComponentMeta } from '@storybook/react';
import { HEADER_MENU, PROFILE } from '../../../mocks';
import { HeaderMobile } from '../HeaderMobile';

export default {
  component: HeaderMobile,
  title: 'Layout/HeaderMobile',
} as ComponentMeta<typeof HeaderMobile>;

const Template: ComponentStory<typeof HeaderMobile> = (args) => (
  <HeaderMobile {...args} />
);

export const Default = Template.bind({});
Default.args = {
  headerMenu: HEADER_MENU,
  profileMenu: PROFILE,
};

export const IsLoggedIn = Template.bind({});
IsLoggedIn.args = {
  headerMenu: HEADER_MENU,
  profileMenu: { ...PROFILE, isLoggedIn: true },
};
