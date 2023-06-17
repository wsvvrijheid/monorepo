import { getTwitterClient } from './client'

export const getUserByUsername = async (username: string) => {
  const twitterClient = await getTwitterClient()

  const response = await twitterClient.v2.userByUsername(username, {
    'user.fields': [
      'public_metrics',
      'profile_image_url',
      'location',
      'verified',
      'description',
    ],
  })

  return response
}
