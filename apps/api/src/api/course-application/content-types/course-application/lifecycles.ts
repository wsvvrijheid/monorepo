import { addToMailList } from '../../../../libs/mailchimp/mailchimp'

export default {
  async afterCreate(event) {
    const { result } = event
    const { email, course } = result

    const courseName = await strapi.entityService.findOne(
      'api::course.course',
      course,
      {
        fields: ['title_en', 'mailchimp'],
      },
    )

    if (!courseName) {
      console.error('Course not found :', course, ' email :', email)
      return
    }

    const mail = courseName.mailchimp as Record<string, string>
    if (!mail) {
      console.error('No mailchimp data : ', courseName)
      return
    }

    const r = await addToMailList(mail.id, email)
    console.info(
      'email',
      email,
      'course',
      course,
      'courseName',
      courseName,
      'result',
      r,
    )
  },
}
