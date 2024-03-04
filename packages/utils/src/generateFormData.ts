import { StrapiCreateInput, StrapiUpdateInput } from '@fc/types'

export const generateFormData = <
  T extends StrapiCreateInput | StrapiUpdateInput,
>(
  body: T,
  hasDataField = true,
) => {
  const formData = new FormData()

  const data = {} as Record<string, unknown>

  Object.entries(body).forEach(([key, value]) => {
    const file = value as File | Blob
    const files = value as File[] | Blob[]

    if (
      file instanceof File ||
      files?.[0] instanceof File ||
      file instanceof Blob ||
      files?.[0] instanceof Blob
    ) {
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

  if (hasDataField) {
    formData.append('data', JSON.stringify(data))
  } else {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string)
    })
  }

  return formData
}
