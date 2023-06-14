import { TwitterApi } from 'twitter-api-v2'

const twitterClient = new TwitterApi(process.env.BEARER_TOKEN)
export const twitterApi = twitterClient.readOnly
