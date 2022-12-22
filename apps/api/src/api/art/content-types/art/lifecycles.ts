export default {
  async afterCreate({ result }) {
    // do not forget to define your comma seperated EDITOR_EMAILS in your local env
    const editorEmails = process.env.EDITOR_EMAILS?.split(',');

    // populating artist to use in email subject
    const populatedArtist = await strapi.entityService.findOne('api::art.art', result.id, {
      populate: {
        artist: {
          fields: ["name", "username"],
        },
      },
    },)
    const artist = populatedArtist.artist;

    if (editorEmails?.length > 0) {
      strapi.plugins['email'].services.email.send({
        to: editorEmails,
        from: 'info@wsvvrijheid.nl',
        subject: `New Art ${result.title} has been created by ${artist.name || artist.username}`,
        html: `<div>
                  <p>Description: ${result.description || result.title}</p>
                  <p>View the art <a href="https://api.wsvvrijheid.nl/admin/content-manager/collectionType/api::art.art/${result.id}">here</a></p>
              </div>`,
      })
    } else {
      console.log('no editor email exists');
    }
  },
}