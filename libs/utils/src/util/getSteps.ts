import { StepType } from '@reactour/tour'
import { TFunction } from 'next-i18next'

export const getStepsPostMaker = (t: TFunction): StepType[] => [
  {
    selector: '[data-tour="step-post-content"]',
    content: t('teps.step-post-content'),
  },
  {
    selector: '[data-tour="step-post-text"]',
    content: t('steps.step-post-text'),
  },
  {
    selector: '[data-tour="step-mention-list"]',
    content: t('steps.step-mention-list'),
  },
  {
    selector: '[data-tour="step-search"]',
    content: t('steps.step-search'),
  },
  {
    selector: '[data-tour="step-trends"]',
    content: t('steps.step-trends'),
  },
  {
    selector: '[data-tour="step-post-added"]',
    content: t('teps.step-post-added'),
  },
  {
    selector: '[data-tour="step-character-limit"]',
    content: t('steps.step-character-limit'),
  },
  {
    selector: '[data-tour="step-next-button"]',
    content: t('steps.step-next-button')`
  },
  {
    selector: '[data-tour="step-other-posts"]',
    content: t('steps.step-other-posts')`,
  },
  {
    selector: '[data-tour="step-share-button"]',
    content: t('steps.step-share-button')`
  },
]

export const getStepsMobilePostMaker = (t: TFunction): StepType[] => [
  {
    selector: '[data-tour-mob="step-post-content"]',
    content: t('steps.step-post-content')`,
  },
  {
    selector: '[data-tour-mob="step-post-text"]',
    content: t('steps.step-post-text')`
  },
  {
    selector: '[data-tour-mob="step-mention-button"]',
    content: t('steps.step-mention-button')`,
  },
  {
    selector: '[data-tour-mob="step-post-added"]',
    content: t('steps.step-post-added')`
  },
  {
    selector: '[data-tour-mob="step-character-limit"]',
    content: t('steps.step-character-limit')`,
  },
  {
    selector: '[data-tour="step-next-button"]',
    content: t('steps.step-next-button')`
  },
  {
    selector: '[data-tour="step-other-posts"]',
    content: t('steps.step-other-posts')`,
  },
  {
    selector: '[data-tour-mob="step-share-button"]',
    content: t('steps.step-share-button'),
  },
]
