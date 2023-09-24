import { StrapiCollectionEndpoint, StrapiModel } from '@wsvvrijheid/types'

import { useActivityColumns } from './activity'
import { useArtColumns } from './art'
import { useBlogColumns } from './blogs'
import { useCollectionColumns } from './collection'
import { useCourseApplicationColumns } from './course-application'
import { useCourseColumns } from './courses'
import { useDonationColumns } from './donation'
import { useHashtagColumns } from './hashtag'
import { usePostColumns } from './post'
import { useProfileColumns } from './profile'
import { useUserColumns } from './user'
import { useUserFeedbacksColumns } from './userFeedbacks'
import { WTableProps } from '../../components'

export const useColumns = <T extends StrapiModel>(): {
  [x in StrapiCollectionEndpoint]?: WTableProps<T>['columns']
} => {
  return {
    activities: useActivityColumns() as WTableProps<T>['columns'],
    arts: useArtColumns() as WTableProps<T>['columns'],
    blogs: useBlogColumns() as WTableProps<T>['columns'],
    collections: useCollectionColumns() as WTableProps<T>['columns'],
    'course-applications':
      useCourseApplicationColumns() as WTableProps<T>['columns'],
    courses: useCourseColumns() as WTableProps<T>['columns'],
    donates: useDonationColumns() as WTableProps<T>['columns'],
    hashtags: useHashtagColumns() as WTableProps<T>['columns'],
    posts: usePostColumns() as WTableProps<T>['columns'],
    profiles: useProfileColumns() as WTableProps<T>['columns'],
    'user-feedbacks': useUserFeedbacksColumns() as WTableProps<T>['columns'],
    users: useUserColumns() as WTableProps<T>['columns'],
  }
}
