import { AppSlug } from '@wsvvrijheid/types'

import { dashboard } from './dashboard'
import { kunsthalte } from './kunsthalte'
import { lotus } from './lotus'
import { samenvvv } from './samenvvv'
import { wsvvrijheid } from './wsvvrijheid'

export { defaultTheme } from './theme'

export const themes: Record<AppSlug, Record<string, any>> = {
  dashboard,
  kunsthalte,
  lotus,
  samenvvv,
  wsvvrijheid,
}
