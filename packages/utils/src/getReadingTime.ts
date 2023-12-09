import { StrapiLocale } from '@wsvvrijheid/types'

export const getReadingTime = (text: string, locale: StrapiLocale) => {
  if (!text) return ''

  const suffix = {
    en: 'mins',
    nl: 'min',
    tr: 'dk',
  }

  const wpm = 225
  const words = text.trim().split(/\s+/).length
  const time = Math.ceil(words / wpm)

  return `${time} ${suffix[locale]}`
}
