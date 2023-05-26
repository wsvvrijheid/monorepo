import { useEffect, useState } from 'react'

import { StoryObj, Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'
import qs from 'qs'

import { TOKEN } from '@wsvvrijheid/secrets'
import { UserStatsProps } from '@wsvvrijheid/types'

import { UserStatistics } from './UserStats'

export default {
  title: 'Admin/UserStatistics',
  component: UserStatistics,
} as Meta<typeof UserStatistics>

const makeStats = () => {
  const getRandom = () => Math.floor(Math.random() * 10)

  const getStats = () => ({
    activity: getRandom(),
    total: getRandom(),
    announcement: getRandom(),
    application: getRandom(),
    blog: getRandom(),
    collection: getRandom(),
    competition: getRandom(),
    hashtag: getRandom(),
    post: getRandom(),
    recommendedTopic: getRandom(),
    recommendedTweet: getRandom(),
  })

  return {
    approves: getStats(),
    creations: getStats(),
  }
}

// create a sample data for the user stats
const userStatsMock: UserStatsProps[] = [
  {
    id: 1,
    date: '01-01-2021',
    count: 1,
    stats: makeStats(),
    user: {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
    },
    createdAt: '2021-02-16T15:00:00.000Z',
    updatedAt: '2021-02-16T15:00:00.000Z',
    publishedAt: '2021-02-16T15:00:00.000Z',
  },
  {
    id: 2,
    date: '01-08-2021',
    count: 2,
    stats: makeStats(),
    user: {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
    },
    createdAt: '2021-02-16T15:00:00.000Z',
    updatedAt: '2021-02-16T15:00:00.000Z',
    publishedAt: '2021-02-16T15:00:00.000Z',
  },
  {
    id: 3,
    date: '01-16-2021',
    count: 3,
    stats: makeStats(),
    user: {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
    },
    createdAt: '2021-02-16T15:00:00.000Z',
    updatedAt: '2021-02-16T15:00:00.000Z',
    publishedAt: '2021-02-16T15:00:00.000Z',
  },
  {
    id: 4,
    date: '01-01-2021',
    count: 3,
    stats: makeStats(),
    user: {
      id: 1,
      name: 'Ali Veli',
      username: 'aliveli',
    },
    createdAt: '2021-02-16T15:00:00.000Z',
    updatedAt: '2021-02-16T15:00:00.000Z',
    publishedAt: '2021-02-16T15:00:00.000Z',
  },
  {
    id: 5,
    date: '01-08-2021',
    count: 3,
    stats: makeStats(),
    user: {
      id: 1,
      name: 'Ali Veli',
      username: 'aliveli',
    },
    createdAt: '2021-02-16T15:00:00.000Z',
    updatedAt: '2021-02-16T15:00:00.000Z',
    publishedAt: '2021-02-16T15:00:00.000Z',
  },
  {
    id: 6,
    date: '01-16-2021',
    count: 3,
    stats: makeStats(),
    user: {
      id: 1,
      name: 'Ali Veli',
      username: 'aliveli',
    },
    createdAt: '2021-02-16T15:00:00.000Z',
    updatedAt: '2021-02-16T15:00:00.000Z',
    publishedAt: '2021-02-16T15:00:00.000Z',
  },
  {
    id: 7,
    date: '01-01-2021',
    count: 3,
    stats: makeStats(),
    user: {
      id: 1,
      name: 'Ahmet Mehmet',
      username: 'ahmetmehmet',
    },
    createdAt: '2021-02-16T15:00:00.000Z',
    updatedAt: '2021-02-16T15:00:00.000Z',
    publishedAt: '2021-02-16T15:00:00.000Z',
  },
  {
    id: 8,
    date: '01-08-2021',
    count: 3,
    stats: makeStats(),
    user: {
      id: 1,
      name: 'Ahmet Mehmet',
      username: 'ahmetmehmet',
    },
    createdAt: '2021-02-16T15:00:00.000Z',
    updatedAt: '2021-02-16T15:00:00.000Z',
    publishedAt: '2021-02-16T15:00:00.000Z',
  },
  {
    id: 9,
    date: '01-16-2021',
    count: 3,
    stats: makeStats(),
    user: {
      id: 1,
      name: 'Ahmet Mehmet',
      username: 'ahmetmehmet',
    },
    createdAt: '2021-02-16T15:00:00.000Z',
    updatedAt: '2021-02-16T15:00:00.000Z',
    publishedAt: '2021-02-16T15:00:00.000Z',
  },
]
type Story = StoryObj<UserStatsProps>

const Template: StoryFn<UserStatsProps> = args => (
  <UserStatistics {...args} userStats={userStatsMock} />
)

export const Default: Story = {
  render: Template,
}

// Test with real data
const DataFetch: StoryFn<UserStatsProps> = args => {
  const [userStats, setUserStats] = useState<UserStatsProps[]>([])

  useEffect(() => {
    const fetchUserStats = async () => {
      const query = qs.stringify(
        {
          filters: {
            user: {
              id: {
                $eq: 37,
              },
            },
          },
          populate: '*',
        },
        {
          encodeValuesOnly: true, // prettify URL
        },
      )
      console.log(query)
      const response = await fetch(
        `http://localhost:1337/api/user-statistics?${query}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
          },
        },
      )
      const data = await response.json()
      console.log(data)
      setUserStats(data.data)
    }

    fetchUserStats()
  }, [])

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {userStats.length === 0 ? (
        <div>Loading</div>
      ) : (
        <UserStatistics {...args} userStats={userStats} />
      )}
    </>
  )
}

export const RealData: Story = {
  render: DataFetch,
}
