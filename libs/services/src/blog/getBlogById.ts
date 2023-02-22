import { useQuery } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/lib'
import { Blog, StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'
import { SetRequired } from 'type-fest'

export const getBlogById = async (
  locale: StrapiLocale,
  id: number,
): Promise<Blog | null> => {
  const response = await Request.collection<
    SetRequired<Blog, 'author' | 'image' | 'likers'>[]
  >({
    url: 'api/blogs',
    populate: ['author', 'image', 'likers'],
    filters: { id: { $eq: id } },
    locale,
  })

  return response?.data?.[0] || null
}

export const useGetBlogId = (id: number) => {
  const { locale } = useRouter()

  return useQuery({
    queryKey: ['blog', locale, id],
    queryFn: () => getBlogById(locale as StrapiLocale, id),
  })
}
