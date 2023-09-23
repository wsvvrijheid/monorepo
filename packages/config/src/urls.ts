import { StrapiEndpoint, StrapiSingleEndpoint } from '@wsvvrijheid/types'

export const endpointsSingleType: StrapiSingleEndpoint[] = [
  'privacy',
  'term',
  'topic',
  'trend',
]

export const endpointsWithLocalizedTitle: StrapiEndpoint[] = [
  'arts',
  'categories',
  'jobs',
  'platforms',
  'tags',
]

export const endpointsWithoutLocale: StrapiEndpoint[] = [
  ...endpointsWithLocalizedTitle,
  'applicants',
  'comments',
  'donates',
  'feedbacks',
  'lang-roles',
  'users',
  'profiles',
  'votes',
]

export const endpointsWithApprovalStatus: StrapiEndpoint[] = [
  'activities',
  'arts',
  'blogs',
  'collections',
  'competitions',
  'courses',
  'course-applications',
  'hashtags',
  'posts',
]

export const endpointsWithPublicationState: StrapiEndpoint[] = [
  'account-statistics',
  'activities',
  'applicants',
  'arts',
  'blogs',
  'categories',
  'collections',
  'competitions',
  'courses',
  'course-applications',
  'feedbacks',
  'hashtags',
  'jobs',
  'lang-roles',
  'mentions',
  'platforms',
  'posts',
  'privacy',
  'recommended-topics',
  'recommended-tweets',
  'tags',
  'term',
  'timelines',
  'topic',
  'user-feedbacks',
  'profiles',
  'votes',
]
