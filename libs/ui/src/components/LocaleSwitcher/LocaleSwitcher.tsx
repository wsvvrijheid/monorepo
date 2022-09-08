import { FC } from 'react'

import { Button, ButtonGroup } from '@chakra-ui/react'
import { StrapiLocale } from '@wsvvrijheid/types'
import { NextRouter, useRouter } from 'next/router'

import { useScroll } from '../../hooks'
import { DynamicProps, LocaleSwitcherProps } from './types'

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

const LocaleSwitcher: FC<LocaleSwitcherProps> = ({ isDark }) => {
  const { push, pathname, locale, asPath, components, query } =
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
      {['en', 'nl', 'tr'].map(code => {
        if (query['slug'] && !slugs?.[code as StrapiLocale]) return null

        let variant = 'ghost'
        if (locale === code) {
          if (!isScrolled && isDark) variant = 'solid'
          else variant = 'outline'
        }

        return !isScrolled && isDark ? (
          <Button
            px={2}
            onClick={() => handleChangeLanguage(code as StrapiLocale)}
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
        ) : (
          <Button
            key={code}
            px={2}
            onClick={() => handleChangeLanguage(code as StrapiLocale)}
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

export default LocaleSwitcher
