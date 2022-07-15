import { Box } from '@chakra-ui/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FOOTER_MENU } from '../../../mocks';
import { FooterNav } from '../FooterNav';

export default {
  component: FooterNav,
  title: 'Layout/FooterNav',
  decorators: [
    (Story) => (
      <Box bg="primary.900">
        <Story />
      </Box>
    ),
  ],
} as ComponentMeta<typeof FooterNav>;

const Template: ComponentStory<typeof FooterNav> = (args) => (
  <FooterNav {...args} />
);

export const Default = Template.bind({});
Default.args = {
  menu: FOOTER_MENU,
};
