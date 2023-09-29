/* eslint-disable no-unused-vars */
import { AxiosRequestHeaders } from 'axios'

export enum Publisher {
  AKTIF_HABER = 'Aktif Haber',
  NOS = 'Nos',
  NRC = 'Nrc',
  AMNESTY = 'Amnesty',
  AMNESTYEN = 'Amnesty En',
  BOLD_MEDYA = 'Bold Medya',
  KATTENKENING = 'Kanttekening',
  NU = 'Nu',
  RTL = 'Rtl',
  SAMANYOLU = 'Samanyolu',
  TR724 = 'Tr724',
  TROUW = 'Trouw',
  VOLKSKRANT = 'Volkskrant',
  TM = 'Turkish Minute',
  IPA = 'Ipa News',
  SWO = 'Solidarity With Others',
}

export enum Locale {
  TR = 'tr',
  EN = 'en',
  NL = 'nl',
}

export type Topic = {
  url: string
  title?: string
  description?: string
  category?: string
  image?: string
  time?: string
  locale: Locale
  publisher: Publisher
}

export type RecommendedTopic = {
  isRecommended: boolean
} & Topic

export type FrontPageSelectors = {
  wrapper: string
  link?: string
  title?: string
  image?: string
  description?: string
  category?: string
  imageAttr?: string
  time?: string
}

export type PageSelectors = {
  link: string
  title?: string
  image?: string
  description?: string
  category?: string
  time?: string
}

export type FormatTopic = (topic: Topic) => Topic

export type ScrapPageArgs = {
  publisher: Publisher
  locale: Locale
  selectors?: PageSelectors
  url: URL
  proxy?: string
  headers?: AxiosRequestHeaders
}

export type ScrapFrontPageArgs = {
  formatTopic?: FormatTopic
  selectors: FrontPageSelectors
} & Omit<ScrapPageArgs, 'selectors'>

export type ScrapTopicsArgs = {
  formatTopic?: FormatTopic
} & Pick<
  ScrapPageArgs,
  'publisher' | 'locale' | 'url' | 'proxy' | 'headers' | 'selectors'
>

export type ScrapLinksArgs = {
  selector: string
} & Pick<ScrapPageArgs, 'url' | 'proxy' | 'headers'>

export type ScrapPage = (args: ScrapPageArgs) => Promise<Topic>

export type ScrapFrontPage = (args: ScrapFrontPageArgs) => Promise<Topic[]>

export type ScrapTopics = (args: ScrapTopicsArgs) => Promise<Topic[]>

export type ScrapLinks = (args: ScrapLinksArgs) => Promise<URL[]>
