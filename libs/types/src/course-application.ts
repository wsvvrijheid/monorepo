import { Course } from './course'
import { StrapiBase } from './strapi'

type CourseApplicationBase = StrapiBase & {
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

export type CourseApplicationCreateInput = CourseApplicationBase & {
  course: number
}

export type CourseApplication = CourseApplicationBase &
  CourseApplicationRelation
