// eslint-disable @nrwl/nx/enforce-module-boundaries
import React from 'react'

import { Box } from '@chakra-ui/react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Provider as ReduxProvider } from 'react-redux'

import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import '@splidejs/react-splide/css'

import { mockWorker, store, themes } from '../src/exports'
import i18n from './i18next'

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/url/dist/style.css'
import '@uppy/image-editor/dist/style.css'

mockWorker.start()
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
    theme: themes.wsvvrijheid,
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
