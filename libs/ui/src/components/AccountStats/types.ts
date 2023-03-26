import { AccountStatsBase } from '@wsvvrijheid/types'
import { AccountStats } from '@wsvvrijheid/types'

export type ChartJSData = {
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
  }>
}

export type AccountStatsProps = {
  stats: AccountStats[]
  field: keyof AccountStatsBase
}
