import type { Schema, Attribute } from '@strapi/strapi'

export interface CourseCurriculum extends Schema.Component {
  collectionName: 'components_course_curricula'
  info: {
    displayName: 'CurriculumItem'
    description: ''
  }
  attributes: {
    title_en: Attribute.String
    title_tr: Attribute.String
    title_nl: Attribute.String
    description_en: Attribute.Text
    description_nl: Attribute.Text
    description_tr: Attribute.Text
    instructor: Attribute.String
    date: Attribute.DateTime
  }
}

export interface FaqFaq extends Schema.Component {
  collectionName: 'components_faq_faqs'
  info: {
    displayName: 'FaqLocale'
    description: ''
  }
  attributes: {
    question_en: Attribute.String
    question_tr: Attribute.String
    question_nl: Attribute.String
    answer_en: Attribute.Text
    answer_tr: Attribute.Text
    answer_nl: Attribute.Text
  }
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'course.curriculum': CourseCurriculum
      'faq.faq': FaqFaq
    }
  }
}
