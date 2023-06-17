type TweetStats = {
  retweet: number
  tweet: number
  getRetweeted: number
  replies: number
  getReplies: number
  total: number
  username: string
}

export class HashtagStatsStore {
  store: Record<string, TweetStats>
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

export const hashtagStatsStore = new HashtagStatsStore()
