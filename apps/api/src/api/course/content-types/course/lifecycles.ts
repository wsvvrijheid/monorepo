import {
  createMailList,
  deleteMailList,
} from '../../../../libs/mailchimp/mailchimp'

const allowDeleteMailList = true

export default {
  async afterCreate(event) {
    const { result } = event
    const { title_en, id } = result

    // create mail list after create a course. and update course with mailchimp data
    // this is because i try to reduse api usage sinse it is limited/not free
    const mailchimp = await createMailList(title_en, id)

    await strapi.entityService.update('api::course.course', result.id, {
      data: {
        mailchimp: mailchimp,
      },
    })
  },

  async afterDelete(event) {
    const { result } = event
    const { mailchimp } = result

    // i didnt want to decide
    // if i should delete mail list on delete course
    // but its ready
    if (allowDeleteMailList) {
      try {
        const id = JSON.parse(mailchimp).id
        await deleteMailList(id)
      } catch (error) {
        console.error(error)
      }
    }
  },
}
