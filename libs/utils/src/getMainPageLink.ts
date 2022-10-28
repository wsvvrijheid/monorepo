import { ROUTES } from '@wsvvrijheid/config'

export const getMainPageLink = (
  type: keyof typeof ROUTES | 'post' | 'hashtag',
): string => (ROUTES as any)[type].link.replace('/', '')
