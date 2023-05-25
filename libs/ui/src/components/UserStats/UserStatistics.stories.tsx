import { useEffect, useState } from 'react'

import { StoryObj, Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'
import qs from 'qs'

import { TOKEN } from '@wsvvrijheid/secrets'
import { UserStats } from '@wsvvrijheid/types'

import { UserStatistics } from './UserStatistics'

export default {
  title: 'Admin/UserStatistics',
  component: UserStatistics,
} as Meta<typeof UserStatistics>

// create a sample data for the user stats
const userStatsMock: UserStats[] = [
  {
    id: 1,
    date: '01-01-2021',
    count: 1,
    stats: {
      approves: {
        activity: 1,
        total: 1,
        announcement: 1,
        application: 1,
        blog: 2,
        collection: 1,
        competition: 1,
        hashtag: 1,
        post: 1,
      },
      creations: {
        activity: 1,
        total: 1,
        announcement: 1,
        application: 1,
        blog: 3,
        collection: 1,
        competition: 1,
        hashtag: 1,
        post: 1,
        recommendedTopic: 1,
        recommendedTweet: 1,
      },
    },
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
    stats: {
      approves: {
        activity: 2,
        total: 4,
        announcement: 2,
        application: 2,
        blog: 5,
        collection: 2,
        competition: 2,
        hashtag: 2,
        post: 2,
      },
      creations: {
        activity: 2,
        total: 2,
        announcement: 2,
        application: 2,
        blog: 2,
        collection: 2,
        competition: 2,
        hashtag: 2,
        post: 2,
        recommendedTopic: 2,
        recommendedTweet: 2,
      },
    },
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
    stats: {
      approves: {
        activity: 3,
        total: 6,
        announcement: 3,
        application: 3,
        blog: 3,
        collection: 3,
        competition: 3,
        hashtag: 3,
        post: 3,
      },
      creations: {
        activity: 3,
        total: 3,
        announcement: 3,
        application: 3,
        blog: 3,
        collection: 3,
        competition: 3,
        hashtag: 3,
        post: 3,
        recommendedTopic: 3,
        recommendedTweet: 3,
      },
    },
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
    date: '01-24-2021',
    count: 3,
    stats: {
      approves: {
        activity: 3,
        total: 6,
        announcement: 3,
        application: 3,
        blog: 3,
        collection: 3,
        competition: 3,
        hashtag: 3,
        post: 3,
      },
      creations: {
        activity: 3,
        total: 3,
        announcement: 3,
        application: 3,
        blog: 3,
        collection: 3,
        competition: 3,
        hashtag: 3,
        post: 3,
        recommendedTopic: 3,
        recommendedTweet: 3,
      },
    },
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
    date: '01-30-2022',
    count: 3,
    stats: {
      approves: {
        activity: 3,
        total: 6,
        announcement: 3,
        application: 3,
        blog: 3,
        collection: 3,
        competition: 3,
        hashtag: 3,
        post: 3,
      },
      creations: {
        activity: 3,
        total: 3,
        announcement: 3,
        application: 3,
        blog: 3,
        collection: 3,
        competition: 3,
        hashtag: 3,
        post: 3,
        recommendedTopic: 3,
        recommendedTweet: 3,
      },
    },
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
    date: '02-16-2023',
    count: 3,
    stats: {
      approves: {
        activity: 3,
        total: 6,
        announcement: 3,
        application: 3,
        blog: 3,
        collection: 3,
        competition: 3,
        hashtag: 3,
        post: 3,
      },
      creations: {
        activity: 3,
        total: 3,
        announcement: 3,
        application: 3,
        blog: 3,
        collection: 3,
        competition: 3,
        hashtag: 3,
        post: 3,
        recommendedTopic: 3,
        recommendedTweet: 3,
      },
    },
    user: {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
    },
    createdAt: '2021-02-16T15:00:00.000Z',
    updatedAt: '2021-02-16T15:00:00.000Z',
    publishedAt: '2021-02-16T15:00:00.000Z',
  },
]
type Story = StoryObj<UserStats>

const Template: StoryFn<UserStats> = args => (
  <UserStatistics {...args} userStats={userStatsMock} />
)

export const Default: Story = {
  render: Template,
}

// Test with real data
const DataFetch: StoryFn<UserStats> = args => {
  const [userStats, setUserStats] = useState<UserStats[]>([])

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
