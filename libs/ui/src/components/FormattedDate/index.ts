import dynamic from 'next/dynamic'

export const FormattedDate = dynamic(() => import('./FormattedDate'), {
  ssr: false,
})
