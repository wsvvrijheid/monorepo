// eslint-disable @nrwl/nx/enforce-module-boundaries
import React from 'react'

import { Box, extendTheme } from '@chakra-ui/react'
import { QueryClientProvider, QueryClient } from 'react-query'

import { mockWorker, themes } from '../src/exports'
import i18n from './i18next'

mockWorker.start()
mockWorker.printHandlers()

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
