// eslint-disable @nrwl/nx/enforce-module-boundaries
import React from 'react'

import { Box, extendTheme } from '@chakra-ui/react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Provider as ReduxProvider } from 'react-redux'

import { mockWorker, store, themes } from '../src/exports'
import '@splidejs/react-splide/css'
import i18n from './i18next'

//mockWorker.start()
mockWorker.printHandlers()

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
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <Box>
          <Story />
        </Box>
      </QueryClientProvider>
    </ReduxProvider>
  ),
]
