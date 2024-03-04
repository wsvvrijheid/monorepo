import { AppSlug } from '@wsvvrijheid/types'

import { kunsthalte } from './kunsthalte'
import { trendRights } from './trend-rights'
import { Menus } from './types'
import { wsvvrijheid } from './wsvvrijheid'

export const menus: Record<AppSlug, Menus> = {
  kunsthalte,
  trendRights,
  wsvvrijheid,
  dashboard: { headerMenu: [], footerMenu: [] },
  lotus: { headerMenu: [], footerMenu: [] },
}
