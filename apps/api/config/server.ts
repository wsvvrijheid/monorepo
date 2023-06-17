import tasks from './cron'

export default ({ env }) => {
  const isDev = env('NODE_ENV') === 'development'

  return {
    host: env('HOST', '0.0.0.0'),
    app: {
      keys: env.array('APP_KEYS'),
    },
    cron: {
      enabled: isDev ? env('ENABLE_LOCAL_CRON') === 'true' : true,
      tasks,
    },
    ...(isDev && {
      port: env.int('PORT', 1337),
      proxy: true,
    }),
  }
}
