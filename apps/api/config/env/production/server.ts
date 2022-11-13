import cronTasks from './cron-tasks'

export default ({ env }) => ({
  host: '0.0.0.0',
  url: env('SERVER_URL'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
  },
  cron: {
    enabled: true,
    tasks: cronTasks,
  },
})
