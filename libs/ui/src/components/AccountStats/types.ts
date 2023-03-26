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
  title: string
  stats: AccountStats[]
  field: keyof AccountStatsBase
}
