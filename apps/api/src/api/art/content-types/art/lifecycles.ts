export default {
  afterCreate({ result }) {
    strapi.plugins['email'].services.email.send({
      to: 'info@wsvvrijheid.nl',
      from: 'info@wsvvrijheid.nl',
      subject: `New Art Created ${result.title}`,
      html: `<p><a href="https://api.wsvvrijheid.nl/admin/content-manager/collectionType/api::art.art${result.id}">${result.title}</a></p>`,
    })
  },
}
