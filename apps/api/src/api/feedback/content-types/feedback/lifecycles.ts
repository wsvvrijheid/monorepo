export default {
  async afterCreate({ result }) {
    const populatedArt = await strapi.entityService.findMany('api::feedback.feedback',{
        filters: {
          id: {
            $eq: result.id,
          },
        },
        populate: ['art'],
      },
    )

    strapi.plugins['email'].services.email.send({
      to: result.createdBy.email,
      from: 'info@wsvvrijheid.nl',
      subject: `Your art '${populatedArt[0].art.title}' application has been ${result.status}`,
      html: `<p><a href="http://localhost:1337/admin/plugins/content-type-builder/content-types/api::feedback.feedback${result.id}">${result.message}</a></p>`,
    })
  },
}