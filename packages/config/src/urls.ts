import { StrapiCollectionUrl, StrapiSingleUrl } from '@wsvvrijheid/types'

export const urlsSingleType: StrapiSingleUrl[] = [
  'api/privacy',
  'api/term',
  'api/topic',
  'api/trend',
]

export const urlsWithLocalizedTitle: StrapiCollectionUrl[] = [
  'api/arts',
  'api/categories',
  'api/jobs',
  'api/platforms',
  'api/tags',
]

export const urlsWithoutLocale: StrapiCollectionUrl[] = [
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
