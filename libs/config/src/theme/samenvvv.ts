import { extendTheme } from '@chakra-ui/react';
import { colors } from './colors';
import { theme } from './theme';

export const samenvvv = extendTheme({
  ...theme,
  colors: {
    primary: colors.samen,
  },
});
