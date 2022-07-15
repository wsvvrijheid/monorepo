import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProfileMenu } from '../ProfileMenu';
import { PROFILE } from '../../../mocks';

export default {
  component: ProfileMenu,
  title: 'Layout/ProfileMenu',
  args: PROFILE,
} as ComponentMeta<typeof ProfileMenu>;

const Template: ComponentStory<typeof ProfileMenu> = (args) => (
  <ProfileMenu {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  isLoggedIn: true,
};
