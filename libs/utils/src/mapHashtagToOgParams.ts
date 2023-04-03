// Ref: https://javascript.info/task/delay-promise
import { format, parse } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'

import { Hashtag, OgImageParams, StrapiLocale } from '@wsvvrijheid/types'

const capsContent = {
  en: { title: 'TAG ANNOUNCEMENT', topic: 'Topic' },
  nl: { title: 'TAG AANKONDIGING', topic: 'Onderwerp' },
  tr: { title: 'ETİKET DUYURUSU', topic: 'Konu' },
}

export const mapHashtagToOgParams = (
  hashtag: Hashtag,
  locale: StrapiLocale,
): OgImageParams => {
  // https://github.com/date-fns/date-fns/issues/1788#issuecomment-763070661
  const newDate = parse(
    hashtag.date,
    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
    new Date(),
  )

  const euDate = newDate && format(newDate, 'dd MMMM yyyy')
  const euTime = newDate && format(newDate, 'HH:mm')
  const trTime =
    newDate && formatInTimeZone(newDate, 'Europe/Istanbul', 'HH:mm')

  const TITLE = capsContent[locale].title
  const TOPIC = capsContent[locale].topic

  return {
    title: `📢 ${TITLE} 📢`,
    text: `📅 ${euDate}\n\n🇳🇱 ${euTime}\n🇹🇷 ${trTime}\n\n${TOPIC}: ${hashtag?.description}`,
    image: 'https://api.wsvvrijheid.nl/uploads/announcement_5a80e36c27.png',
    shape: 0,
    bg: 'white',
    color: 'black',
    flip: true,
    hasLine: true,
    scale: 0.5,
  }
}
