import tweets from './tweets'
import hashtags from './hashtags'

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
