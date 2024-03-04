import { NextSeoProps } from 'next-seo'

import { AppSlug, Localize } from '@wsvvrijheid/types'

import { dashboard } from './dashboard'
import { kunsthalte } from './kunsthalte'
import { lotus } from './lotus'
import { trendRights } from './trend-rights'
import { wsvvrijheid } from './wsvvrijheid'

export const defaultSeo: Record<AppSlug, Localize<NextSeoProps>> = {
  dashboard,
  lotus,
  kunsthalte,
  trendRights,
  wsvvrijheid,
}
