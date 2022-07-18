import { Button } from '@chakra-ui/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Navigate } from './Navigate';

export default {
  component: Navigate,
  title: 'Shared/Navigate',
} as ComponentMeta<typeof Navigate>;

const Template: ComponentStory<typeof Navigate> = (args) => (
  <Navigate {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: 'Default',
  href: '/',
};

export const AsButtonInternalLink = Template.bind({});
AsButtonInternalLink.args = {
  children: 'Button',
  href: '/button',
  as: Button,
};

export const AsButtonExternalLink = Template.bind({});
AsButtonExternalLink.args = {
  children: 'Button',
  href: 'http://localhost:3000',
  as: Button,
  colorScheme: 'primary',
};
