import { StrapiCollectionUrl } from '@wsvvrijheid/types'

export const urlsWithLocalizedTitle: StrapiCollectionUrl[] = [
  'arts',
  'categories',
  'jobs',
  'platforms',
  'tags',
]

export const urlsWithoutLocale: StrapiCollectionUrl[] = [
  ...urlsWithLocalizedTitle,
  'applicants',
  'comments',
  'donates',
  'feedbacks',
  'lang-roles',
  'users',
  'volunteers',
  'votes',
]
