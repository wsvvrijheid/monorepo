import { ReactNode } from 'react'

import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { InferType } from 'yup'

import { Course, FaqLocale } from '@fc/types'

import { applicationSchema } from './schema'

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

export type ApplicationFormFields = InferType<
  ReturnType<typeof applicationSchema>
>

export type CourseApplicationFormProps = {
  courseId: number
}
