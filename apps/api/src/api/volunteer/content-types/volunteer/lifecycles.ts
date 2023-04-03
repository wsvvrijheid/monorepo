export default {
  afterCreate({ result }) {
    if (process.env.IMPORTING === 'true') return

    strapi.plugins['email'].services.email.send({
      to: 'info@wsvvrijheid.nl',
      from: 'info@wsvvrijheid.nl',
      subject: `New volunteer ${result.name}`,
      html: `<pre>${JSON.stringify(result, null, 2)}</pre>`,
    })
  },
}
