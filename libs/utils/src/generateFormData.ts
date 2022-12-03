import { StrapiMutationInput } from '@wsvvrijheid/types'

export const generateFormData = <T extends StrapiMutationInput>(body: T) => {
  const formData = new FormData()

  const data = {} as Record<string, unknown>

  Object.entries(body).forEach(([key, value]) => {
    const blob = value as File
    const blobs = value as File[]

    if (blob instanceof File || blobs?.[0] instanceof File) {
      if (Array.isArray(value)) {
        value.forEach((blob, index) => {
          formData.append(`files.${key}`, blob as File)
        })
      } else {
        // TODO `image` represents the field name in Strapi. This should be dynamic
        // or we should make sure that we always use `image` as the field name for all models
        formData.append(`files.${key}`, value as File)
      }
    } else {
      data[key] = value
    }
  })

  formData.append('data', JSON.stringify(data))

  return formData
}
