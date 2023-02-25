import { useMemo } from 'react'

import {
  Activity,
  Category,
  Hashtag,
  Mention,
  Post,
  StrapiLocale,
  StrapiModel,
  StrapiTranslatableModel,
  User,
} from '@wsvvrijheid/types'
import { format } from 'date-fns'
import { useRouter } from 'next/router'

import { FormFields } from './types'

export const mapModelsToOptions = (
  models?: StrapiModel[],
  locale?: StrapiLocale,
) => models?.map(model => mapModelToOption(model, locale))

export const mapModelToOption = (
  model?: StrapiModel,
  locale?: StrapiLocale,
) => {
  if (!model) return { value: '', label: '' }

  const mention = model as unknown as Mention
  const user = model as unknown as User
  const modelWithLocalizedName = model as unknown as Category
  const localizedName = locale
    ? modelWithLocalizedName[`name_${locale}`]
    : 'name'
  const value = model.id.toString()
  let label = (model as StrapiTranslatableModel).title

  // Mention
  if (mention.data && mention.username) {
    label = `@${mention.username}`
  }

  // User
  else if (user.email) {
    label = user.name || user.username
  }

  // Category, Tag etc.
  else if (localizedName) {
    label = localizedName
  }

  return { value, label }
}

export const useDefaultValues = <T extends StrapiModel>(
  model?: T | null,
  fields?: FormFields<T>,
) => {
  const hashtagModel = model as Hashtag
  const postModel = model as Post

  const { locale } = useRouter()

  return useMemo(() => {
    if (!model || !fields) return {} as T

    const defaults = {} as any
    const { date } = model as Activity

    const dateString = date ? format(new Date(date), 'yyyy-MM-dd') : undefined
    const dateTimeString = date
      ? new Date(date).toISOString().replace('Z', '')
      : undefined

    fields.forEach(field => {
      switch (field.name) {
        case 'date':
          if (field.type === 'date') {
            defaults[field.name] = dateString
          } else if (field.type === 'datetime-local') {
            defaults[field.name] = dateTimeString
          }
          break
        case 'mentions':
          defaults.mentions =
            hashtagModel.mentions?.map(m => ({
              label: m.username,
              value: m.id.toString(),
            })) || []
          break
        case 'hashtag':
          defaults.hashtag = {
            label: postModel.hashtag?.title,
            value: postModel.hashtag?.id.toString(),
          }

          break
        case 'categories':
          defaults.categories =
            hashtagModel?.categories?.map(c => ({
              label: c[`name_${locale as StrapiLocale}`],
              value: c.id.toString(),
            })) || []
          break
        case 'tags':
          defaults.tags =
            postModel?.tags?.map(c => ({
              label: c[`name_${locale as StrapiLocale}`],
              value: c.id.toString(),
            })) || []
          break
        default:
          defaults[field.name] = model[field.name as keyof T] || undefined
          break
      }
    })

    return defaults
  }, [model, fields, locale])
}
