import { ComponentStory, ComponentMeta } from '@storybook/react';
import { HeaderNavItem } from '../HeaderNavItem';

export default {
  component: HeaderNavItem,
  title: 'Layout/HeaderNavItem',
} as ComponentMeta<typeof HeaderNavItem>;

const Template: ComponentStory<typeof HeaderNavItem> = (args) => (
  <HeaderNavItem {...args} />
);

export const Default = Template.bind({});
Default.args = {
  item: { link: '/events', en: 'Events', nl: 'Evenementen', tr: 'Etkinlikler' },
};

export const Parent = Template.bind({});
Parent.args = {
  item: {
    en: 'Events',
    nl: 'Evenementen',
    tr: 'Etkinlikler',

    children: [
      { link: '/events', en: 'Events', nl: 'Evenementen', tr: 'Etkinlikler' },
    ],
  },
};
