import { Box, Flex } from '@chakra-ui/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FOOTER_MENU, SOCIAL_LINKS } from '../../../mocks';
import { Footer } from '../Footer';

export default {
  component: Footer,
  title: 'Layout/Footer',
  decorators: [
    (Story) => (
      <Flex bg="gray.300" minH="100vh" align="end">
        <Box w="full">
          <Story />
        </Box>
      </Flex>
    ),
  ],
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {
  menu: FOOTER_MENU,
  about: 'About',
  logo: 'https://wsvvrijheid.nl/images/logo.svg',
  socialItems: SOCIAL_LINKS,
};
