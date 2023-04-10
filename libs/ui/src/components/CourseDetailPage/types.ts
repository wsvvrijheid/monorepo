import { ReactNode } from 'react'

import { MDXRemoteSerializeResult } from 'next-mdx-remote'

import {
  Course,
  CourseApplicationCreateInput,
  FaqLocale,
} from '@wsvvrijheid/types'

export type CourseDetailPageProps = {
  course: Course
  courses: Course[]
  source: MDXRemoteSerializeResult
}

export type CourseInfoProps = {
  course: Course
}

export type CourseFaqsProps = {
  faqs: FaqLocale[]
}

export type CourseFaqItemProps = {
  item: FaqLocale
  isExpanded: boolean
}

export type CourseInfoItemProps = {
  label: string
  value: string
  icon: ReactNode
}

export type ApplicationFormFields = Pick<
  CourseApplicationCreateInput,
  'name' | 'email' | 'country' | 'city' | 'message' | 'phone' | 'course'
>

export type CourseApplicationFormProps = {
  courseId: number
}
