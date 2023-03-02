import tweets from './tweets'
import hashtags from './hashtags'
import timeline from './timeline'
import accountStatistics from './accountStatistics'

export default {
  tweets: {
    task: tweets,
    options: {
      rule: '*/10 * * * *',
      tz: 'Europe/Amsterdam',
    },
  },
  hashtags: {
    task: hashtags,
    options: {
      rule: '*/15 * * * *',
      tz: 'Europe/Amsterdam',
    },
  },
  timelines: {
    task: timeline,
    options: {
      rule: '0 */6 * * *',
      tz: 'Europe/Amsterdam',
    },
  },
  accountStatistics: {
    task: accountStatistics,
    options: {
      rule: '0 0 8 * * 1',
      tz: 'Europe/Amsterdam',
    },
  },
}

/* 

# ┌───────────── minute (0 - 59)
# │ ┌───────────── hour (0 - 23)
# │ │ ┌───────────── day of the month (1 - 31)
# │ │ │ ┌───────────── month (1 - 12)
# │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday;
# │ │ │ │ │                                   7 is also Sunday on some systems)
# │ │ │ │ │
# │ │ │ │ │
# * * * * * <command to execute>

*/
