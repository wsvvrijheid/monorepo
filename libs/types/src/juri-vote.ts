import { Application } from './application'
import { Juri } from './juri'
import { StrapiCore } from './strapi'

export type JuriVote = {
  value: number
  juri?: Juri
  application?: Application
} & StrapiCore
