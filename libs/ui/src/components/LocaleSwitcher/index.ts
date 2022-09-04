import dynamic from 'next/dynamic'

export const LocaleSwitcher = dynamic(() => import('./LocaleSwitcher'), {
  ssr: false,
})
