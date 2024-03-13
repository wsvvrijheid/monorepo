import { errors } from '@strapi/utils'
import {
  addToMailList,
  createMailList,
} from '../../../libs/mailchimp/mailchimp'
const { UnauthorizedError } = errors

export default {
  async createMailList(ctx) {
    if (!ctx.state.user) {
      //should we add, if user is admin or has enough permission to do this job
      throw new UnauthorizedError('User required')
    }

    const courseId = ctx.params.id

    const course = await strapi.entityService.findOne(
      'api::course.course',
      courseId,
      {
        fields: ['title_en', 'mailchimp'],
      },
    )

    if (!course) {
      throw new errors.NotFoundError('Course not found')
    }

    const mailchimp = await createMailList(course.title_en, courseId)

    await strapi.entityService.update('api::course.course', courseId, {
      data: { mailchimp },
    })

    if (!mailchimp.id) {
      throw new errors.NotFoundError('MailChimp error : ', mailchimp.error)
    }

    const applicants = await strapi.entityService.findMany(
      'api::course-application.course-application',
      {
        filters: {
          course: {
            id: {
              $eq: courseId,
            },
          },
        },
        fields: ['email'],
      },
    )

    await addToMailList(
      mailchimp.id,
      applicants.map(applicant => applicant.email),
    )
  },
}
