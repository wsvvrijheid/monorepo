import { Box } from '@chakra-ui/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FooterNavItem } from '../FooterNavItem';

export default {
  component: FooterNavItem,
  title: 'Layout/FooterNavItem',
  decorators: [
    (Story) => (
      <Box p={4} bg="primary.900">
        <Story />
      </Box>
    ),
  ],
} as ComponentMeta<typeof FooterNavItem>;

const Template: ComponentStory<typeof FooterNavItem> = (args) => (
  <FooterNavItem {...args} />
);

export const Default = Template.bind({});
Default.args = {
  item: {
    link: '/about',
    en: 'About',
    nl: 'Over',
    tr: 'Hakkımızda',
  },
};
