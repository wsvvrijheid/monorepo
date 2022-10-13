import slugify from '@sindresorhus/slugify'
import { API_URL, TOKEN } from '@wsvvrijheid/config'
import {
  Category,
  CategoryCreateInput,
  StrapiSingleResponse,
} from '@wsvvrijheid/types'
import axios, { AxiosResponse } from 'axios'

type CategoryFormFields = Pick<
  CategoryCreateInput,
  'name_en' | 'name_nl' | 'name_tr'
>

export const createCategoryWithAxios = async (args: CategoryFormFields) => {
  const { name_en, name_nl, name_tr } = args

  const slug = slugify(name_en)

  const categoryBody: CategoryCreateInput = {
    name_en,
    name_nl,
    name_tr,
    slug,
    publishedAt: null, // It's important to set this to null, otherwise it will be published
  }

  // Typed axios request
  // const axiosResponse = await axios.post<
  //   StrapiSingleResponse<Category>,
  //   AxiosResponse<StrapiSingleResponse<Category>>,
  //   { data: CategoryCreateInput }
  // >
  const axiosResponse = (await axios.post(
    `${API_URL}/api/categories`,
    { data: categoryBody }, // Strapi expects the data to be in a data property
    {
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
    },
  )) as AxiosResponse<StrapiSingleResponse<Category>>

  const result = axiosResponse.data.data
  return result
}
