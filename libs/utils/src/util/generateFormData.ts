import { StrapiMutationInput } from '@wsvvrijheid/types'

export const generateFormData = <T extends StrapiMutationInput>(body: T) => {
  const formData = new FormData()

  const data = {} as Record<string, unknown>

  Object.entries(body).forEach(([key, value]) => {
    const blob = value as Blob
    const blobs = value as Blob[]

    if (blob instanceof Blob || blobs?.[0] instanceof Blob) {
      if (Array.isArray(value)) {
        value.forEach((blob, index) => {
          // TODO `images` represents the field name in Strapi. This should be dynamic
          // or we should make sure that we always use `images` as the field name for all models
          formData.append(`files.images`, blob as Blob)
        })
      } else {
        // TODO `image` represents the field name in Strapi. This should be dynamic
        // or we should make sure that we always use `image` as the field name for all models
        formData.append('files.image', value as Blob)
      }
    } else {
      data[key] = value
    }
  })

  formData.append('data', JSON.stringify(data))

  return formData
}
