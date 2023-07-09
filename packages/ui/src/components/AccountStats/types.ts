import { AccountStatsBase } from '@wsvvrijheid/types'
import { AccountStats } from '@wsvvrijheid/types'

export type ChartJSData = {
  labels: Array<{
    username: string
    fill: string
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
