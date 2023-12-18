import { parse } from 'pg-connection-string'

export default ({ env }) => {
  const { host, user, password = '', database } = parse(env('DATABASE_URL'))

  return {
    connection: {
      client: 'postgres',
      connection: {
        host: env('DATABASE_HOST', host),
        port: '5432',
        database: env('DATABASE_NAME', database),
        user: env('DATABASE_USER', user),
        password: env('DATABASE_PASSWORD', password),
        pool: {
          min: 0,
          max: 10,
          idleTimeoutMillis: 30000000,
          createTimeoutMillis: 30000000,
          acquireTimeoutMillis: 30000000,
          propagateCreateError: false,
          ssl: {
            rejectUnauthorized: false,
          },
        },
      },
      debug: false,
    },
  }
}
