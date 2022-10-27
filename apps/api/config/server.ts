import cronTasks from './env/production/cron-tasks';

export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  proxy: true,
  app: {
    keys: env.array('APP_KEYS'),
  },
  cron: {
    enabled: env.ENABLE_LOCAL_CRON === 'true',
    tasks: cronTasks,
  },
});
