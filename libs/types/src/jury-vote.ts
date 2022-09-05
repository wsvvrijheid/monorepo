import { Application } from './application'
import { Jury } from './jury'
import { StrapiCore } from './strapi'

export type JuryVote = {
  value: number
  jury?: Jury
  application?: Application
} & StrapiCore
