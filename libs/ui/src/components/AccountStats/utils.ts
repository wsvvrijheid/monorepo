import { theme } from '@chakra-ui/react'
import { AccountStats, AccountStatsBase } from '@wsvvrijheid/types'

import { ChartJSData } from './types'

export const getChartData = (
  stats: AccountStats[],
  field: keyof AccountStatsBase,
): ChartJSData => {
  const { blue, red, green, purple, pink, orange, yellow, cyan, teal } =
    theme.colors

  const bgColors = [
    blue[300],
    green[300],
    purple[300],
    red[300],
    pink[300],
    orange[300],
    yellow[300],
    cyan[300],
    teal[300],
  ]

  const borderColors = [
    blue[500],
    green[500],

    purple[500],
    red[500],
    pink[500],
    orange[500],
    yellow[500],
    cyan[500],
    teal[500],
  ]

  const chartData: ChartJSData = {
    labels: [], // array to store dates
    datasets: [], // array to store datasets
  }

  // iterate over unique usernames and create datasets for each user
  stats.forEach((d, index) => {
    if (!chartData.labels.includes(d.date)) {
      chartData.labels.push(d.date)
    }

    const datasetIndex = chartData.datasets.findIndex(
      ds => ds.label === d.username,
    )

    if (datasetIndex === -1) {
      chartData.datasets.push({
        label: d.username,
        data: [d[field] as number],
        backgroundColor: bgColors[index],
        borderColor: borderColors[index],
      })
    } else {
      chartData.datasets[datasetIndex].data.push(d[field] as number)
    }
  })
  return chartData
}
