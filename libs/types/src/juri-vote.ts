import { Application, RawApplication } from './application'
import { Juri, RawJuri } from './juri'
import { StrapiEntity, StrapiRawEntity } from './strapi'

export type RawJuriVote = {
  id: number
  value: number
  juri: StrapiRawEntity<RawJuri>
  application: StrapiRawEntity<RawApplication>
}

export type JuriVote = {
  id: number
  value: number
  juri: StrapiEntity<Juri>
  application: StrapiEntity<Application>
}
