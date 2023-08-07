import accountStats from './accountStats'
import hashtags from './hashtags'
import timeline from './timeline'
import trends from './trends'
import userStats from './userStats'

export default {
  trends: {
    task: trends,
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
      rule: '0 */23 * * *',
      tz: 'Europe/Amsterdam',
    },
  },
  accountStats: {
    task: accountStats,
    options: {
      rule: '0 0 * * SUN',
      tz: 'Europe/Amsterdam',
    },
  },
  userStats: {
    task: userStats,
    options: {
      rule: '0 0 * * SUN',
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
