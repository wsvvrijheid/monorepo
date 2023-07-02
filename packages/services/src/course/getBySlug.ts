import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { Request } from '@wsvvrijheid/lib'
import { Course } from '@wsvvrijheid/types'

export const getCourseBySlug = async (slug: string): Promise<Course | null> => {
  const response = await Request.collection<Course>({
    url: 'api/courses',
    filters: { slug: { $eq: slug } },
  })

  if (!response || !response?.data || !response.data.length) return null

  const course = response.data[0] || null

  return course
}

export const useCourse = () => {
  const {
    query: { slug },
  } = useRouter()

  return useQuery({
    queryKey: ['hashtag', slug],
    queryFn: () => getCourseBySlug(slug as string),
  })
}
