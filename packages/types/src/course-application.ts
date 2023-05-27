import { ApprovalStatus } from './common'
import { Course } from './course'
import { StrapiBase } from './strapi'

type CourseApplicationBase = {
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

export type CourseApplicationCreateInput = Omit<
  CourseApplicationBase,
  'hasPaid' | 'approvalStatus'
> & {
  course: number
}

export type CourseApplication = StrapiBase &
  CourseApplicationBase &
  CourseApplicationRelation
