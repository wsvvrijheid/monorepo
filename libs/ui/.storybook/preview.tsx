// eslint-disable @nrwl/nx/enforce-module-boundaries
import React from 'react'

import { Box } from '@chakra-ui/react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Provider as ReduxProvider } from 'react-redux'

import { store, themes } from '../src/exports'
import i18n from './i18next'

import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import '@splidejs/react-splide/css'

export const parameters = {
  i18n,
  chakra: {
    theme: themes.wsvvrijheid,
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
}

// Create a global variable called locale in storybook
// and add a menu in the toolbar to change your locale
export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', title: 'English' },
        { value: 'nl', title: 'Nederlands' },
        { value: 'tr', title: 'Türkçe' },
      ],
      showName: true,
    },
  },
}

i18n.on('languageChanged', locale => {
  const direction = i18n.dir(locale)
  document.dir = direction
})

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
