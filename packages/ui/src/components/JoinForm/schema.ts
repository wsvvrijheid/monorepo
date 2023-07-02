import { TFunction } from 'next-i18next'
import * as yup from 'yup'

// TODO: @ekrem fix yup schema add methot and reduce opt.
// Link: https://stackoverflow.com/questions/69176340/yup-addmethod-not-working-in-typescript-yup-version

export const joinSchema = (t: TFunction) => {
  yup.addMethod(
    yup.object,
    'atLeastOneRequired',
    function (list: Array<any>, message) {
      return this.test({
        name: 'atLeastOneRequired',
        message,
        exclusive: true,
        params: { keys: list.join(', ') },
        test: value =>
          value == null || list.some(f => !!value[`${f.id}_${f.slug}`]),
      })
    },
  )

  return yup.object().shape({
    name: yup.string().required(t('apply-form.name.required') as string),
    age: yup.number().required(t('apply-form.age.required') as string),
    city: yup.string().required(t('apply-form.city.required') as string),
    email: yup
      .string()
      .email(t('apply-form.email.invalid') as string)
      .required(t('apply-form.email.required') as string),
    phone: yup.string().required(t('apply-form.phone.required') as string),
    occupation: yup.string(),
    comment: yup.string(),
    inMailingList: yup.boolean(),
    isPublic: yup.boolean(),
    availableHours: yup
      .number()
      .min(1)
      .max(40)
      .required(t('apply-form.available-hours.required') as string),
    heardFrom: yup
      .array()
      .required(t('apply-form.jobs.required') as string)
      .min(1),
    jobs: yup
      .array()
      .required(t('apply-form.jobs.required') as string)
      .min(1),
  })
}
