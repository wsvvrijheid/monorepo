import { Application } from './application'
import { Jury } from './jury'
import { StrapiCore } from './strapi'

export type JuryVote = {
  value: number
  juri?: Jury
  application?: Application
} & StrapiCore
