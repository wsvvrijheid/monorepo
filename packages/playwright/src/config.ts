import { AppSlug } from '@wsvvrijheid/types'

export const ports: Record<AppSlug, number> = {
  dashboard: 3000,
  wsvvrijheid: 3001,
  kunsthalte: 3002,
  lotus: 3003,
  samenvvv: 3004,
}

export const projects = Object.keys(ports) as AppSlug[]
