import { Course } from './course'
import { StrapiBase } from './strapi'

type CourseApplicationBase = {
  name: string
  email: string
  city: string
  country: string
  phone: string
  motivation: string
  hasPaid: boolean
  approvalStatus: string
}

type CourseApplicationRelation = {
  course: Course
}

export type CourseApplicationCreateInput = Omit<
  CourseApplicationBase,
  'hasPaid' | 'approvalStatus'
> & {
  course: number
}

export type CourseApplication = StrapiBase &
  CourseApplicationBase &
  CourseApplicationRelation
