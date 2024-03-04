import { AppSlug } from '@wsvvrijheid/types'

import { dashboard } from './dashboard'
import { kunsthalte } from './kunsthalte'
import { lotus } from './lotus'
import { trendRights } from './trend-rights'
import { wsvvrijheid } from './wsvvrijheid'

export { defaultTheme } from './theme'

export const themes: Record<AppSlug, Record<string, any>> = {
  dashboard,
  kunsthalte,
  lotus,
  trendRights,
  wsvvrijheid,
}
