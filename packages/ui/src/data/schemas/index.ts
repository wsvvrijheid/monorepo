import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { ObjectSchema, setLocale } from 'yup'
import { nl, tr } from 'yup-locales'

import { PartialStrapiEndpointMap, StrapiModel } from '@wsvvrijheid/types'

import { activityFields, useActivitySchema } from './activity'
import { artFields, useArtSchema } from './art'
import { assetFields, useAssetsSchema } from './assets'
import { assetsTrackingFields, useAssetsTrackingSchema } from './assetsTracking'
import { blogFields, useBlogSchema } from './blog'
import { collectionFields, useCollectionSchema } from './collection'
import { courseFields, useCourseSchema } from './course'
import {
  courseApplicationFields,
  useCourseApplicationSchema,
} from './courseApplication'
import { foundationFields, useFoundationsSchema } from './foundation'
import { hashtagFields, useHashtagSchema } from './hashtag'
import { postFields, usePostSchema } from './post'
import { profileFields, useProfileSchema } from './profile'
import {
  recommendedTweetFields,
  useRecommendedTweetSchema,
} from './recommendedTweet'
import { topicFields, useTopicSchema } from './topic'
import {
  translateModelFields,
  translateModelSchema,
  translatePostModelFields,
  translatePostModelSchema,
} from './translate'
import { useUserSchema, userFields } from './user'
import { useUserFeedbackSchema, userFeedbackFields } from './userFeedback'
import { FormFields } from '../../admin'

export const useSchema = (): PartialStrapiEndpointMap<ObjectSchema<any>> => {
  const { locale } = useRouter()

  useEffect(() => {
    if (locale === 'tr') setLocale(tr)
    if (locale === 'nl') setLocale(nl)
  }, [locale])

  return {
    foundations: useFoundationsSchema(),
    assets: useAssetsSchema(),
    'assets-trackings': useAssetsTrackingSchema(),
    activities: useActivitySchema(),
    arts: useArtSchema(),
    blogs: useBlogSchema(),
    collections: useCollectionSchema(),
    courses: useCourseSchema(),
    'course-applications': useCourseApplicationSchema(),
    hashtags: useHashtagSchema(),
    posts: usePostSchema(),
    'recommended-tweets': useRecommendedTweetSchema(),
    topic: useTopicSchema(),
    'translate-model': translateModelSchema,
    'translate-post-model': translatePostModelSchema,
    'user-feedbacks': useUserFeedbackSchema(),
    users: useUserSchema(),
    profiles: useProfileSchema(),
  }
}

export const useFields = <T extends StrapiModel>(): PartialStrapiEndpointMap<
  FormFields<T>
> => {
  return {
    assets: assetFields as FormFields<T>,
    'assets-trackings': assetsTrackingFields as FormFields<T>,
    activities: activityFields as FormFields<T>,
    arts: artFields as FormFields<T>,
    blogs: blogFields as FormFields<T>,
    collections: collectionFields as FormFields<T>,
    courses: courseFields as FormFields<T>,
    'course-applications': courseApplicationFields as FormFields<T>,
    foundations: foundationFields as FormFields<T>,
    hashtags: hashtagFields as FormFields<T>,
    posts: postFields as FormFields<T>,
    profiles: profileFields as FormFields<T>,
    'recommended-tweets': recommendedTweetFields as FormFields<T>,
    topic: topicFields as FormFields<T>,
    'translate-model': translateModelFields as FormFields<T>,
    'translate-post-model': translatePostModelFields as FormFields<T>,
    users: userFields as FormFields<T>,
    'user-feedbacks': userFeedbackFields as FormFields<T>,
  }
}
