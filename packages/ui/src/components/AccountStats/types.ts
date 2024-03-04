import { AccountStatsBase } from '@fc/types'
import { AccountStats } from '@fc/types'

export type ChartJSData = {
  labels: Array<{
    username: string
    stroke: string
  }>
  datasets: Array<{
    name: string
  }>
}

export type AccountStatsProps = {
  stats: AccountStats[]
  field: keyof AccountStatsBase
}
