import { GetServerSidePropsContext } from 'next/types'

import { getCourseById } from './getById'

export const getCourseServerProps = async (
  context: GetServerSidePropsContext,
) => {
  const id = context.params?.['id'] as string

  const course = await getCourseById(id)

  return { course }
}
