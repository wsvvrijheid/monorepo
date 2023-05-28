import { useQuery } from '@tanstack/react-query'

import { Request } from '@wsvvrijheid/lib'
import { Course } from '@wsvvrijheid/types'

export const getCourseById = async (
  id: string,
): Promise<{ course: Course } | null> => {
  const coursesResponse = await Request.single<Course>({
    url: 'api/courses',
    id: Number(id),
  })

  const course = coursesResponse.data

  if (!course) return null

  return {
    course,
  }
}

export const useCourseById = (id: string) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => getCourseById(id),
  })
}