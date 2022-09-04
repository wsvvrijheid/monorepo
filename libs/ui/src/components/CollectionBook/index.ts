import dynamic from 'next/dynamic'

export const CollectionBook = dynamic(() => import('./CollectionBook'), {
  ssr: false,
})
export * from './CollectionPages'
export * from './Flipbook'
export * from './Page'
