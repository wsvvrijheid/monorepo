import slugify from '@sindresorhus/slugify'
import { Category, CategoryCreateInput } from '@wsvvrijheid/types'
import { Mutation } from '@wsvvrijheid/utils'

type CategoryFormFields = Pick<
  CategoryCreateInput,
  'name_en' | 'name_nl' | 'name_tr'
>

export const createCategoryWithMutation = async (args: CategoryFormFields) => {
  const { name_en, name_nl, name_tr } = args
  const slug = slugify(name_en)

  const categoryBody: CategoryCreateInput = {
    name_en,
    name_nl,
    name_tr,
    slug,
    publishedAt: null, // It's important to set this to null, otherwise it will be published
  }

  const result = await Mutation.post<Category, CategoryCreateInput>(
    'api/blogs',
    categoryBody,
  )

  return result
}
