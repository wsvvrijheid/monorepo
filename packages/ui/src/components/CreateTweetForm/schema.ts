import * as yup from 'yup'

export const schema = yup.object({
  text: yup.string().required('Title is required'),
  image: yup.mixed(),
  mentions: yup.array().of(
    yup.object().shape({
      label: yup.string(),
      value: yup.string(),
    }),
  ),
})
