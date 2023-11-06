import { ProjectApp } from './types'

export const ports: Record<ProjectApp, number> = {
  dashboard: 3000,
  wsvvrijheid: 3001,
  kunsthalte: 3002,
  lotus: 3003,
  samenvvv: 3004,
}

export const projects = Object.keys(ports) as ProjectApp[]
