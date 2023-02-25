import { useQuery } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/lib'
import { Blog, StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'
import { SetRequired } from 'type-fest'

export const getBlogBySlug = async (
  locale: StrapiLocale,
  slug: string,
): Promise<Blog | null> => {
  const response = await Request.collection<
    SetRequired<Blog, 'author' | 'image' | 'likers'>[]
  >({
    url: 'api/blogs',
    populate: ['author', 'image', 'likers'],
    filters: { id: { $eq: slug } },
    locale,
  })

  return response?.data?.[0] || null
}

export const useGetBlogSlug = (slug: string) => {
  const { locale } = useRouter()

  return useQuery({
    queryKey: ['blog', locale, slug],
    queryFn: () => getBlogBySlug(locale as StrapiLocale, slug),
  })
}
