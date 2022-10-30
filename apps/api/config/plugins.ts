import { TwitterApi } from 'twitter-api-v2'
const twitterClient = new TwitterApi(process.env.BEARER_TOKEN as string)
const client = twitterClient.readOnly

export default ({ env }) => ({
  twitter: {
    enabled: true,
    resolve: './src/plugins/twitter',
    config: {
      client,
    },
  },
  graphql: {
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: true,
      depthLimit: 10,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
  email: {
    enabled: true,
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: 'mail.privateemail.com',
        port: 465,
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
      },
      settings: {
        defaultFrom: 'info@wsvvrijheid.nl',
        defaultReplyTo: 'info@wsvvrijheid.nl',
      },
    },
  },
  transformer: {
    enabled: true,
    config: {
      prefix: '/api/',
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
    },
  },
})
