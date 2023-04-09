import { ApprovalStatus } from './common'
import { Course } from './course'
import { StrapiBase } from './strapi'

type CourseApplicationBase = StrapiBase & {
  name: string
  email: string
  city: string | null
  country: string | null
  phone: string | null
  message: string | null
  hasPaid: boolean
  approvalStatus: ApprovalStatus
}

type CourseApplicationRelation = {
  course: Course
}

export type CourseApplicationCreateInput = CourseApplicationBase & {
  course: number
}

export type CourseApplication = CourseApplicationBase &
  CourseApplicationRelation
