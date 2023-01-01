import {
  Category,
  Mention,
  StrapiLocale,
  StrapiTranslatableModel,
  User,
} from '@wsvvrijheid/types'

export const mapModelToOption = (
  model: StrapiTranslatableModel,
  locale: StrapiLocale,
) => {
  const mention = model as unknown as Mention
  const user = model as unknown as User
  const modelWithLocalizedName = model as unknown as Category
  const localizedName = modelWithLocalizedName[`name_${locale}`]
  const value = model.id.toString()
  let label = model.title

  // Mention
  if (mention.data && mention.username) {
    label = `@${mention.username}`
  }

  // Category, Tag etc.
  if (localizedName) {
    label = localizedName
  }

  // User
  if (user.email) {
    label = user.name || user.username
  }

  return { value, label }
}
