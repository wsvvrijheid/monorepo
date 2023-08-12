import * as yup from 'yup'

export const createFeedbackSchema = yup.object({
  commend: yup.string().required('Commend is required'),
  image: yup.mixed(),
  point: yup.number(),
})
