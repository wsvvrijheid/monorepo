import { FC, useEffect, useRef, useState } from 'react'

import { Radio, RadioGroup, Stack, VStack } from '@chakra-ui/react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

import { UserStats } from '@wsvvrijheid/types'

type UserStatsProps = {
  userStats: UserStats[]
}

export const UserStatistics: FC<UserStatsProps> = ({ userStats }) => {
  const [type, setType] = useState<'approves' | 'creations'>('approves')
  const [keys, setKeys] = useState<string[]>([])

  const parentElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (type === 'approves') {
      setKeys(Object.keys(userStats[0].stats.approves))
    } else {
      setKeys(Object.keys(userStats[0].stats.creations))
    }
  }, [type, userStats])

  return (
    <VStack justifyContent={'center'}>
      <Stack>
        <RadioGroup
          defaultValue="approves"
          onChange={value => setType(value as 'approves' | 'creations')}
        >
          <Stack spacing={5} direction="row">
            <Radio colorScheme="green" value="approves">
              Approves
            </Radio>
            <Radio colorScheme="green" value="creations">
              Creations
            </Radio>
          </Stack>
        </RadioGroup>
      </Stack>
      <Stack
        flexDirection={'row'}
        flexWrap={'wrap'}
        justifyContent={'center'}
        ref={parentElement}
        w={'100%'}
      >
        {keys.map(key => (
          <LineChart
            width={(parentElement.current?.offsetWidth as number) / 2 || 500}
            height={400}
            data={userStats}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend iconType="square" />
            <Line
              type="monotone"
              dataKey={`stats.${type}.${key}`}
              stroke={`#${Math.floor(Math.random() * 0xffffff)
                .toString(16)
                .padEnd(6, '0')}`}
              activeDot={{ r: 8 }}
              name={key.charAt(0).toUpperCase() + key.slice(1)}
              strokeWidth={3}
            />
          </LineChart>
        ))}
      </Stack>
    </VStack>
  )
}
