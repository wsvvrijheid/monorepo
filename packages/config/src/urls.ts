import { StrapiUrl, StrapiSingleUrl } from '@wsvvrijheid/types'

export const urlsSingleType: StrapiSingleUrl[] = [
  'api/privacy',
  'api/term',
  'api/topic',
  'api/trend',
]

export const urlsWithLocalizedTitle: StrapiUrl[] = [
  'api/arts',
  'api/categories',
  'api/jobs',
  'api/platforms',
  'api/tags',
]

export const urlsWithoutLocale: StrapiUrl[] = [
  ...urlsWithLocalizedTitle,
  'api/applicants',
  'api/comments',
  'api/donates',
  'api/feedbacks',
  'api/lang-roles',
  'api/users',
  'api/volunteers',
  'api/votes',
]

export const urlsWithApprovalStatus: StrapiUrl[] = [
  'api/activities',
  'api/announcements',
  'api/arts',
  'api/blogs',
  'api/collections',
  'api/competitions',
  'api/courses',
  'api/course-applications',
  'api/hashtags',
  'api/posts',
]

export const urlsWithPublicationState: StrapiUrl[] = [
  'api/account-statistics',
  'api/activities',
  'api/announcements',
  'api/applicants',
  'api/arts',
  'api/blogs',
  'api/categories',
  'api/collections',
  'api/competitions',
  'api/courses',
  'api/course-applications',
  'api/feedbacks',
  'api/hashtags',
  'api/jobs',
  'api/lang-roles',
  'api/mentions',
  'api/platforms',
  'api/posts',
  'api/privacy',
  'api/recommended-topics',
  'api/recommended-tweets',
  'api/tags',
  'api/term',
  'api/timelines',
  'api/topic',
  'api/user-feedbacks',
  'api/volunteers',
  'api/votes',
]
