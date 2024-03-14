import { FC, useEffect, useRef, useState } from 'react'

import { Checkbox, CheckboxGroup, Stack, Text, VStack } from '@chakra-ui/react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { UserStats as UserStatsType } from '@fc/types'

import { getColor, groupStats } from './utils'

type UserStatsProp = {
  userStats: UserStatsType[]
}

export const UserStatistics: FC<UserStatsProp> = ({ userStats }) => {
  const { groupedUserStats, names } = groupStats(userStats)
  const [displayedNames, setDisplayedNames] = useState<string[]>([])
  const [chartWidth, setChartWidth] = useState<number>(500)
  const parentElement = useRef<HTMLDivElement>(null)
  useEffect(() => {
    setChartWidth((parentElement?.current?.clientWidth as number) / 2)
  }, [])

  const handleUserChange = (value: (string | number)[]) => {
    setDisplayedNames(value as string[])
  }

  return (
    <VStack justifyContent={'center'}>
      <Stack direction={'row'}>
        <CheckboxGroup onChange={value => handleUserChange(value)}>
          {names.map(name => (
            <Checkbox key={name} colorScheme="green" value={name}>
              {name}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </Stack>

      <Stack
        flexDirection={'row'}
        flexWrap={'wrap'}
        justifyContent={'center'}
        w={'100%'}
        ref={parentElement}
      >
        <VStack>
          <Text fontWeight={'bold'}>Approved Posts</Text>
          <LineChart
            width={chartWidth}
            height={400}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={'date'} allowDuplicatedCategory={false} />
            <YAxis />
            <Tooltip />
            <Legend iconType="square" />
            {displayedNames.map((name, i) => (
              <Line
                key={name}
                type="monotone"
                dataKey={`stats.approvedPosts`}
                data={groupedUserStats?.find(user => user?.name === name)?.data}
                stroke={getColor(i)}
                activeDot={{ r: 8 }}
                name={name}
                strokeWidth={3}
              />
            ))}
          </LineChart>
        </VStack>
      </Stack>
    </VStack>
  )
}
