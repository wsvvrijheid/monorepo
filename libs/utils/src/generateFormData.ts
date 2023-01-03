import { StrapiCreateInput, StrapiUpdateInput } from '@wsvvrijheid/types'

export const generateFormData = <
  T extends StrapiCreateInput | StrapiUpdateInput,
>(
  body: T,
) => {
  const formData = new FormData()

  const data = {} as Record<string, unknown>

  Object.entries(body).forEach(([key, value]) => {
    const file = value as File
    const files = value as File[]

    if (file instanceof File || files?.[0] instanceof File) {
      if (Array.isArray(value)) {
        value.forEach(f => {
          formData.append(`files.${key}`, f as File)
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
