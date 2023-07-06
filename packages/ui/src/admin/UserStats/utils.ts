import { theme } from '@chakra-ui/react'

import { UserStatsProps } from '@wsvvrijheid/types'

export const getColor = (index: number) => {
  const { blue, red, green, purple, pink, orange, yellow, cyan, teal } =
    theme.colors

  const colors = [
    blue[300],
    green[300],
    purple[300],
    red[300],
    pink[300],
    orange[300],
    yellow[300],
    cyan[300],
    teal[300],
    blue[300],
    green[300],
    blue[500],
    green[500],
    purple[500],
    red[500],
    pink[500],
    orange[500],
    yellow[500],
    cyan[500],
    teal[500],
    blue[500],
    green[500],
    blue[700],
    green[700],
    purple[700],
    red[700],
    pink[700],
    orange[700],
    yellow[700],
    cyan[700],
    teal[700],
    blue[700],
    green[700],
  ]

  return colors[index]
}

export const groupStats = (
  stats: UserStatsProps[],
): {
  groupedUserStats: { name: string; data: UserStatsProps[] }[]
  names: string[]
} => {
  const groupedStats = stats.reduce(
    (result, stat) => {
      const { name } = stat.user
      if (name && !result[name]) {
        result[name] = { name, data: [] }
      }
      if (name) {
        result[name].data.push(stat)
      }

      return result
    },
    {} as { [name: string]: { name: string; data: UserStatsProps[] } },
  )

  const groupedUserStats: { name: string; data: UserStatsProps[] }[] =
    Object.values(groupedStats).map(({ name, data }) => ({
      name,
      data: data.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      ),
    }))

  return { groupedUserStats, names: Object.keys(groupedStats) }
}

export const getKeys = (
  stats: UserStatsProps,
  type: 'approves' | 'creations',
) => Object.keys(stats.stats[type])
