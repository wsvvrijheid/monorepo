import { useEffect, useState } from 'react'

import { Meta, StoryFn, StoryObj } from '@storybook/react'
import qs from 'qs'

import { PUBLIC_TOKEN } from '@wsvvrijheid/config'
import { UserStats as UserStatasType, UserStatsData } from '@wsvvrijheid/types'

import { UserStatistics } from './UserStats'

export default {
  title: 'Admin/UserStatistics',
  component: UserStatistics,
} as Meta<typeof UserStatistics>

const makeStats = (): UserStatsData => {
  const getRandom = () => Math.floor(Math.random() * 10)

  return {
    approvedActivity: getRandom(),
    approvedApplication: getRandom(),
    approvedBlog: getRandom(),
    approvedCollection: getRandom(),
    approvedCompetition: getRandom(),
    approvedHashtag: getRandom(),
    approvedPost: getRandom(),
    approvedTotal: getRandom(),
    createdActivity: getRandom(),
    createdApplication: getRandom(),
    createdBlog: getRandom(),
    createdCollection: getRandom(),
    createdCompetition: getRandom(),
    createdHashtag: getRandom(),
    createdPost: getRandom(),
    createdRecommendedTopic: getRandom(),
    createdTotal: getRandom(),
    createdRecommendedTweet: getRandom(),
  }
}

// create a sample data for the user stats
const userStatsMock: UserStatasType[] = [
  {
    id: 1,
    date: '01-01-2021',
    ...makeStats(),
    profile: {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@email.com',
    },
    createdAt: '2021-02-16T15:00:00.000Z',
    updatedAt: '2021-02-16T15:00:00.000Z',
    publishedAt: '2021-02-16T15:00:00.000Z',
  },
  {
    id: 2,
    date: '01-08-2021',
    ...makeStats(),
    profile: {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@email.com',
    },
    createdAt: '2021-02-16T15:00:00.000Z',
    updatedAt: '2021-02-16T15:00:00.000Z',
    publishedAt: '2021-02-16T15:00:00.000Z',
  },
  {
    id: 3,
    date: '01-16-2021',
    ...makeStats(),
    profile: {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@email.com',
    },
    createdAt: '2021-02-16T15:00:00.000Z',
    updatedAt: '2021-02-16T15:00:00.000Z',
    publishedAt: '2021-02-16T15:00:00.000Z',
  },
]
type Story = StoryObj<UserStatasType>

const Template: StoryFn<UserStatasType> = args => (
  <UserStatistics {...args} userStats={userStatsMock} />
)

export const Default: Story = {
  render: Template,
}

// Test with real data
const DataFetch: StoryFn<UserStatasType> = args => {
  const [userStats, setUserStats] = useState<UserStatasType[]>([])

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

      const response = await fetch(
        `http://localhost:1337/api/user-statistics?${query}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${PUBLIC_TOKEN}`,
          },
        },
      )
      const data = await response.json()

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
