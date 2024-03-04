import { AppSlug } from '@fc/types'

import { foundation } from './foundation'
import { kunsthalte } from './kunsthalte'
import { trendRights } from './trend-rights'
import { Menus } from './types'

export const menus: Record<AppSlug, Menus> = {
  kunsthalte,
  'trend-rights': trendRights,
  foundation,
  dashboard: { headerMenu: [], footerMenu: [] },
  lotus: { headerMenu: [], footerMenu: [] },
}
