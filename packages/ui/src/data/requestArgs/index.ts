import { useTranslation } from 'next-i18next'

import { RequestCollectionArgs } from '@wsvvrijheid/lib'
import { StrapiCollectionEndpoint } from '@wsvvrijheid/types'

import { FilterOption, RelationFilterOption } from '../../admin'

type UseRequestArgsReturn = Partial<
  Record<
    StrapiCollectionEndpoint,
    {
      relationFilters?: RelationFilterOption[]
      filters?: FilterOption[]
      populate?: RequestCollectionArgs['populate']
      searchFields?: string[]
    }
  >
>

export const useRequestArgs = (): UseRequestArgsReturn => {
  const { t } = useTranslation()

  return {
    hashtags: {
      searchFields: ['title'],
    },
    collections: {
      searchFields: ['title', 'description'],
    },
    posts: {
      relationFilters: [
        {
          endpoint: 'hashtags',
          field: 'hashtag',
        },
      ],
      searchFields: ['description'],
    },
    courses: {
      relationFilters: [
        {
          endpoint: 'platforms',
          field: 'platform',
        },
      ],
    },
    blogs: {
      relationFilters: [
        {
          endpoint: 'profiles',
          field: 'profile',
          label: t('author'),
          // queryFilters: { ownedBlogs: { id: { $gt: 0 } } },
        },
      ],
      searchFields: ['title', 'description'],
    },
    users: {
      searchFields: ['username'],
      relationFilters: [
        {
          endpoint: 'users-permissions/roles',
          field: 'role',
        },
      ],
    },
    profiles: {
      relationFilters: [
        {
          endpoint: 'jobs',
          field: 'jobs',
        },
        {
          endpoint: 'users-permissions/roles',
          field: 'role',
        },
      ],
      filters: [
        {
          field: 'isVolunteer',
          label: t('volunteer'),
          operator: '$eq',
        },
      ],
      populate: ['users.role', 'jobs.platform',  'role'],
      searchFields: ['name', 'email'],
    },
  }
}
