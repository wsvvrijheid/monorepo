import { Context } from 'koa'

export default {
  async email(ctx: Context) {
    const result = await strapi
      .service('api::donate.donate')
      .findOne(ctx.params.id, {})

    await strapi.plugins['email'].services.email.send({
      to: result.email,
      from: 'info@wsvvrijheid.nl',
      replyTo: 'info@wsvvrijheid.nl',
      subject: 'Bedankt voor je donatie!',
      text: 'We hebben je donatie ontvangen en zullen deze zo snel mogelijk verwerken. Bedankt voor je steun!',
    })

    return { message: 'Email sent' }
  },
}
