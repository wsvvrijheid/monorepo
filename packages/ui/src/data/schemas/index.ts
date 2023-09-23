import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { ObjectSchema, setLocale } from 'yup'
import { tr, nl } from 'yup-locales'

import { PartialStrapiEndpointMap, StrapiModel } from '@wsvvrijheid/types'

import { activityFields, useActivitySchema } from './activity'
import { artFields, useArtSchema } from './art'
import { blogFields, useBlogSchema } from './blog'
import { collectionFields, useCollectionSchema } from './collection'
import { courseFields, useCourseSchema } from './course'
import {
  courseApplicationFields,
  useCourseApplicationSchema,
} from './courseApplication'
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
import { userFeedbackFields, useUserFeedbackSchema } from './userFeedback'
import { FormFields } from '../../admin'

export const useSchema = (): PartialStrapiEndpointMap<ObjectSchema<any>> => {
  const { locale } = useRouter()

  useEffect(() => {
    if (locale === 'tr') setLocale(tr)
    if (locale === 'nl') setLocale(nl)
  }, [locale])

  return {
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
    profiles: useProfileSchema(),
  }
}

export const useFields = <T extends StrapiModel>(): PartialStrapiEndpointMap<
  FormFields<T>
> => {
  return {
    activities: activityFields as FormFields<T>,
    arts: artFields as FormFields<T>,
    blogs: blogFields as FormFields<T>,
    collections: collectionFields as FormFields<T>,
    courses: courseFields as FormFields<T>,
    'course-applications': courseApplicationFields as FormFields<T>,
    hashtags: hashtagFields as FormFields<T>,
    posts: postFields as FormFields<T>,
    'recommended-tweets': recommendedTweetFields as FormFields<T>,
    topic: topicFields as FormFields<T>,
    'translate-model': translateModelFields as FormFields<T>,
    'translate-post-model': translatePostModelFields as FormFields<T>,
    users: profileFields as FormFields<T>,
    'user-feedbacks': userFeedbackFields as FormFields<T>,
    profiles: profileFields as FormFields<T>,
  }
}
