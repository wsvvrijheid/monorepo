import { Box, extendTheme } from '@chakra-ui/react'
import { themes } from '@wsvvrijheid/config'
import { QueryClientProvider, QueryClient } from 'react-query'

import i18n from './i18next.js'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'

// Provide the MSW addon decorator globally
export const parameters = {
  i18n,
  locale: 'en',
  locales: {
    en: 'English',
    nl: 'Nederlands',
    tr: 'Türkçe',
  },
  chakra: {
    theme: extendTheme({
      ...themes.wsvvrijheid,
      colors: { primary: themes.wsvvrijheid.colors.blue },
    }),
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const queryClient = new QueryClient()

/**
 * adds a Storybook decorator to get the cache and dev tools showing for each story
 */
export const decorators = [
  Story => (
    <QueryClientProvider client={queryClient}>
      <Box>
        <Story />
      </Box>
    </QueryClientProvider>
  ),
]
