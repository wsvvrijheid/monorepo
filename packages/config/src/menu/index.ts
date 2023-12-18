import { AppSlug } from '@wsvvrijheid/types'

import { kunsthalte } from './kunsthalte'
import { samenvvv } from './samenvvv'
import { Menus } from './types'
import { wsvvrijheid } from './wsvvrijheid'

export const menus: Record<AppSlug, Menus> = {
  kunsthalte,
  samenvvv,
  wsvvrijheid,
  dashboard: { headerMenu: [], footerMenu: [] },
  lotus: { headerMenu: [], footerMenu: [] },
}
