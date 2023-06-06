import { Context } from 'koa'
import { ETwitterStreamEvent } from 'twitter-api-v2'

import { twitterApi } from '../../../libs'
import { getReferenceModel, mapTweetResponseToTweet } from '../../../utils'

let isStarted = false

class Store {
  store: object
  totalActivity: number
  constructor() {
    this.store = {}
    this.totalActivity = 0
  }

  reset() {
    this.store = {}
    this.totalActivity = 0
  }

  isUserExist(username: string) {
    if (!this.store[username]) {
      this.store[username] = {
        retweet: 0,
        tweet: 0,
        getRetweeted: 0,
        replies: 0,
        getReplies: 0,
        total: 0,
        username,
      }
    }
  }

  increaseTotal(username: string) {
    this.store[username].total =
      this.store[username].retweet +
      this.store[username].tweet +
      this.store[username].getRetweeted +
      this.store[username].replies +
      this.store[username].getReplies
  }

  increment(
    username: string,
    tweet: {
      user: string
      tweet: string
      isRetweeted: { username: string }
      isRetweet: boolean
      isReply: string
    },
  ) {
    this.isUserExist(username)

    if (!tweet.isReply && !tweet.isRetweet && !tweet.isRetweeted) {
      this.store[username].tweet += 1
    } else if (tweet.isReply) {
      if (tweet.isRetweeted) {
        this.store[username].replies += 1
        this.isUserExist(tweet.isRetweeted.username)
        this.store[tweet.isRetweeted.username].getReplies += 1
        this.increaseTotal(tweet.isRetweeted.username)
        this.totalActivity += 1
      } else {
        this.store[username].replies += 1
      }
    } else if (tweet.isRetweet && tweet.isRetweeted) {
      this.store[username].retweet += 1
      this.isUserExist(tweet.isRetweeted.username)
      this.store[tweet.isRetweeted.username].getRetweeted += 1
      this.increaseTotal(tweet.isRetweeted.username)
      this.totalActivity += 1
    }

    this.increaseTotal(username)
    this.totalActivity += 1
  }
}

const store = new Store()

export default {
  async search(ctx) {
    try {
      const result = await twitterApi.v2.search({
        query: ctx.query.q as string,
        max_results: 50,
        expansions: ['attachments.media_keys'],
        'media.fields': ['url', 'preview_image_url', 'variants'],
        'tweet.fields': ['attachments'],
      })

      const tweetsData = result?.data.data
      const includes = result?.data.includes

      const tweets = mapTweetResponseToTweet(tweetsData, includes)

      ctx.send(tweets)
    } catch (error) {
      console.error('Error searching hashtags', error.message)
      ctx.send([])
    }
  },
  async approve(ctx: Context) {
    const result = await strapi
      .service('api::hashtag.hashtag')
      .update(ctx.params.id, {
        data: {
          approvalStatus: 'approved',
          publishedAt: new Date(),
          approver: ctx.state.user.id,
        },
        populate: ['localizations'],
      })

    return { data: result }
  },
  async relation(ctx: Context) {
    const id = ctx.params.id

    const currentHashtag = await strapi
      .service('api::hashtag.hashtag')
      .findOne(id, {
        populate: ['localizations.image'],
      })

    const referenceHashtag = getReferenceModel(currentHashtag)

    const result = await strapi.service('api::hashtag.hashtag').update(id, {
      data: { image: referenceHashtag.image?.id },
    })

    return { data: result }
  },

  async hashtagEventStats(ctx: Context) {
    const { duration } = ctx.query

    // check if stream is started
    if (isStarted) {
      return { message: 'Stream is already started' }
    }

    // check if duration is provided
    if (!duration) {
      return { message: 'Duration is required' }
    }

    // check if duration is a number
    if (Number.isNaN(parseInt(duration as string))) {
      return { message: 'Duration is not a number' }
    }

    try {
      const sixHoursAgo = new Date(
        Date.now() - 0.5 * 60 * 60 * 1000,
      ).toISOString()

      // get hashtags
      const data = await strapi.entityService.findMany('api::hashtag.hashtag', {
        filters: {
          publishedAt: {
            $gte: sixHoursAgo,
          },
        },
      })

      // check if there is no hashtags
      if (!data || data.length === 0) return 'No hashtags in the last 6 hours'

      // convert hashtags to rule format
      const hashtags = data.map(hashtag => ({
        value: hashtag.hashtagDefault,
        tag: hashtag.hashtagDefault,
      }))

      // reset rules
      const rules = await twitterApi.v2.streamRules()
      if (rules.data?.length) {
        await twitterApi.v2.updateStreamRules({
          delete: { ids: rules.data.map(rule => rule.id) },
        })
      }

      // add your rules here
      await twitterApi.v2.updateStreamRules({
        add: hashtags,
      })

      // start stream
      const stream = await twitterApi.v2.getStream('tweets/search/stream', {
        'tweet.fields': [
          'entities',
          'text',
          'public_metrics',
          'created_at',
          'referenced_tweets',
          'in_reply_to_user_id',
          'reply_settings',
        ],
        'user.fields': ['username', 'name', 'profile_image_url'],
        expansions: [
          'author_id',
          'referenced_tweets.id',
          'in_reply_to_user_id',
        ],
      })

      // auto reconnect
      stream.autoReconnect = true

      // listen for tweets
      stream.on(ETwitterStreamEvent.Data, async tweet => {
        // reconnect on error
        if (tweet.errors) {
          stream.reconnect()
        }

        // convert tweet to grouped tweet
        const groupedTweet = {
          user: tweet.includes?.users[0]?.username,
          tweet: tweet.data.text,
          tweetId: tweet.data.id,
          isRetweeted: tweet.includes?.users[1],
          isRetweet: tweet.data.referenced_tweets?.some(
            tweet => tweet.type === 'retweeted',
          ),
          isReply: tweet.data.in_reply_to_user_id,
        }
        store.increment(groupedTweet.user, groupedTweet)
      })

      // to prevent starting the stream again
      isStarted = true

      // reconnect on error
      stream.on(ETwitterStreamEvent.Error, error => {
        console.error('Error occurred', error)
        stream.reconnect()
      })

      // send stored tweets to db every 30 minutes
      const saveTweets = setInterval(async () => {
        const storedData = Object.values(store.store)
        const tweets = storedData.map(tweet => ({
          username: tweet.username,
          total: tweet.total,
          retweet: tweet.retweet,
          tweets: tweet.tweet,
          replies: tweet.replies,
          getReplies: tweet.getReplies,
          getRetweeted: tweet.getRetweeted,
        }))
        // update tweets
        await strapi.service('api::hashtag.hashtag').update(data[0].id, {
          data: {
            tweets,
          },
        })
      }, 30 * 60 * 1000)

      // close the stream after the duration(hours)
      setTimeout(() => {
        stream.destroy()
        isStarted = false
        store.reset()
        clearInterval(saveTweets)
      }, parseInt(duration as string) * 60 * 60 * 1000)

      return { message: 'Stream is open' }
    } catch (error) {
      if (
        error.code === 429 &&
        error.data?.connection_issue === 'TooManyConnections'
      ) {
        return { message: 'Connection is already open', error }
      }

      return { message: 'Something went wrong.', error }
    }
  },

  async getHashtagStats() {
    const lengthOfUsers = Object.keys(store.store).length
    const mostActiveFiveUsers = Object.values(store.store)
      .sort((a, b) => b.total - a.total)
      .slice(0, 5)
    const mostRetweetedFiveUsers = Object.values(store.store)
      .sort((a, b) => b.retweet - a.retweet)
      .slice(0, 5)

    const mostTweetedFiveUsers = Object.values(store.store)
      .sort((a, b) => b.tweet - a.tweet)
      .slice(0, 5)

    const mostretweetedByOther = Object.values(store.store)
      .sort((a, b) => b.getRetweeted - a.getRetweeted)
      .slice(0, 5)

    const mostRepliedFiveUsers = Object.values(store.store)
      .sort((a, b) => b.replies - a.replies)
      .slice(0, 5)
    const fiveUsersWithMostReplies = Object.values(store.store)
      .sort((a, b) => b.getReplies - a.getReplies)
      .slice(0, 5)

    return {
      activeUsers: lengthOfUsers,
      totalActivity: store.totalActivity,
      mostActiveFiveUsers,
      mostRetweetedFiveUsers,
      mostTweetedFiveUsers,
      mostretweetedByOther,
      mostRepliedFiveUsers,
      fiveUsersWithMostReplies,
    }
  },
}
