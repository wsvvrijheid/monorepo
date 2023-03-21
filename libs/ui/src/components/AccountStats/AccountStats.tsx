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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

export type AccountStatsProps = {
  title: string
}

export const AccountStats: FC<AccountStatsProps> = ({ title }) => {
  const labels = ['7 Jan', '14 Jan', '21 Jan']

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

  const data = {
    labels,
    datasets: [
      {
        label: 'Hesap1',
        data: [556, 678, 784],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Hesap2',
        data: [673, 865, 935],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Hesap 3',
        data: [798, 899, 999],
        borderColor: '#b856ac',
        backgroundColor: '#b856ac',
      },
    ],
  }

  return (
    <Box p="5" minH={250}>
      <Line options={options} data={data} />{' '}
    </Box>
  )
}
