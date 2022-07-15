import { extendTheme } from '@chakra-ui/react';
import { theme } from './theme';

export const kunsthalte = extendTheme({
  ...theme,
  colors: {
    primary: theme['colors'].red,
  },
});
