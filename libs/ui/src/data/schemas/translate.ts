import { Activity, Collection, Hashtag, Post } from '@wsvvrijheid/types'
import * as yup from 'yup'

import { FormFields } from '../../admin'

export const translatePostSchema = yup.object({
  title: yup.string(),
  description: yup.string(),
  content: yup.string(),
})

export const translateBlogSchema = yup.object({
  title: yup.string(),
  description: yup.string(),
  content: yup.string(),
})

export const translateActivitySchema = yup.object({
  title: yup.string(),
  description: yup.string(),
  content: yup.string(),
})
export const translateHashtagSchema = yup.object({
  title: yup.string(),
  description: yup.string(),
  content: yup.string(),
})
export const translateCollectionSchema = yup.object({
  title: yup.string(),
  description: yup.string(),
  content: yup.string(),
})
export const translateHashtagField: FormFields<Hashtag> = [
  { name: 'title', type: 'textarea' },
  { name: 'description', type: 'textarea' },
  { name: 'content', type: 'markdown' },
]
export const translatePostField: FormFields<Post> = [
  { name: 'title', type: 'textarea' },
  { name: 'description', type: 'textarea' },
  { name: 'content', type: 'markdown' },
]
export const translateActivityField: FormFields<Activity> = [
  { name: 'title', type: 'textarea' },
  { name: 'description', type: 'textarea' },
  { name: 'content', type: 'markdown' },
]
export const translateBlogyField: FormFields<Activity> = [
  { name: 'title', type: 'textarea' },
  { name: 'description', type: 'textarea' },
  { name: 'content', type: 'markdown' },
]
export const translateCollectionField: FormFields<Collection> = [
  { name: 'title', type: 'textarea' },
  { name: 'description', type: 'textarea' },
  { name: 'content', type: 'markdown' },
]
