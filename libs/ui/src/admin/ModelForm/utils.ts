import {
  Category,
  Mention,
  StrapiLocale,
  StrapiModel,
  StrapiTranslatableModel,
  User,
} from '@wsvvrijheid/types'

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
