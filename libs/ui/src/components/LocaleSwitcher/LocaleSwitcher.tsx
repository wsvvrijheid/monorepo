import { FC } from 'react'

import { Button, ButtonGroup, DarkMode } from '@chakra-ui/react'
import { Announcement, Hashtag, Post, StrapiLocale } from '@wsvvrijheid/types'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { NextSeoProps } from 'next-seo'
import { NextRouter, useRouter } from 'next/router'
import { DehydratedState } from 'react-query'

import { useScroll } from '../../hooks'

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

interface LocaleSwitcherProps {
  isDark?: boolean
}

type RouterType = {
  locales: StrapiLocale[]
  locale: StrapiLocale
  components: Record<
    string,
    {
      props: {
        pageProps: DynamicProps
      }
    }
  >
} & Omit<NextRouter, 'locales' | 'locale'>

export const LocaleSwitcher: FC<LocaleSwitcherProps> = ({ isDark }) => {
  const { locales, push, pathname, locale, asPath, components, query } =
    useRouter() as RouterType
  const isScrolled = useScroll()

  const slugs = components?.[pathname].props.pageProps?.slugs

  // TODO: Redirect to localized path for static pages
  const handleChangeLanguage = async (locale: StrapiLocale) => {
    await push(pathname, slugs?.[locale] || asPath, { locale })
  }

  return (
    <ButtonGroup spacing={0} size="sm" alignItems="center">
      {/* TODO: Remove after storybook test */}
      {(locales || ['en', 'nl', 'tr'])?.map(code => {
        if (query['slug'] && !slugs?.[code as StrapiLocale]) return null

        let variant = 'ghost'
        if (locale === code) {
          if (!isScrolled && isDark) variant = 'solid'
          else variant = 'outline'
        }

        return !isScrolled && isDark ? (
          <DarkMode key={code}>
            <Button
              px={2}
              onClick={() => handleChangeLanguage(code)}
              colorScheme={
                locale === code
                  ? 'primary'
                  : !isScrolled && isDark
                  ? 'gray'
                  : 'blackAlpha'
              }
              variant={variant}
            >
              {code.toUpperCase()}
            </Button>
          </DarkMode>
        ) : (
          <Button
            key={code}
            px={2}
            onClick={() => handleChangeLanguage(code)}
            colorScheme={
              locale === code
                ? 'primary'
                : !isScrolled && isDark
                ? 'gray'
                : 'blackAlpha'
            }
            variant={variant}
          >
            {code.toUpperCase()}
          </Button>
        )
      })}
    </ButtonGroup>
  )
}
