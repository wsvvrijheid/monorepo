import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

import { AccountStatsProps } from './types'
import { getChartData } from './utils'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

export const AccountStats: FC<AccountStatsProps> = ({
  title,
  stats,
  field,
}) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  }

  const chartData = getChartData(stats, field)

  return (
    <Box p="5" minH={250}>
      <Line options={options} data={chartData} />
    </Box>
  )
}
