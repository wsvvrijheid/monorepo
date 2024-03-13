import { AppSlug } from '@fc/types'

export const ports: Record<AppSlug, number> = {
  dashboard: 3000,
  foundation: 3001,
  kunsthalte: 3002,
  lotus: 3003,
  'trend-rights': 3004,
}

export const projects = Object.keys(ports) as AppSlug[]
