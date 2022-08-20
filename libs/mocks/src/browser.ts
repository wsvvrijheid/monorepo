import { setupWorker } from 'msw'

import { handlers } from './handlers'

// This configures a Service Worker with the given request handlers.
export const mockWorker = setupWorker(...handlers)
