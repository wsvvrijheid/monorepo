import { DehydratedState } from '@tanstack/react-query'
import { Announcement, Hashtag, Post, StrapiLocale } from '@wsvvrijheid/types'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { NextSeoProps } from 'next-seo'

export interface DynamicProps {
  locale: StrapiLocale
  slugs: {
    en: string
    nl: string
    tr: string
  }
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  dehydratedState: DehydratedState
  pageData: Hashtag | Post | Announcement | Record<string, unknown>
  _nextI18Next: any
  seo: NextSeoProps
  link: string
}

export interface LocaleSwitcherProps {
  isDark?: boolean
}
