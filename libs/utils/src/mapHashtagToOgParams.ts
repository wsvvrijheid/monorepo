// Ref: https://javascript.info/task/delay-promise
import { Hashtag, OgImageParams, StrapiLocale } from '@wsvvrijheid/types'
import { format } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'

const capsContent = {
  en: { title: 'TAG ANNOUNCEMENT', topic: 'Topic' },
  nl: { title: 'TAG AANKONDIGING', topic: 'Onderwerp' },
  tr: { title: 'ETİKET DUYURUSU', topic: 'Konu' },
}

export const mapHashtagToOgParams = (
  hashtag: Hashtag,
  locale: StrapiLocale,
): OgImageParams => {
  const newDate = hashtag?.date && new Date(hashtag?.date as string)

  const euDate = newDate && format(newDate, 'dd MMMM yyyy')
  const euTime = newDate && format(newDate, 'HH:mm')
  const trTime =
    newDate && formatInTimeZone(newDate, 'Europe/Istanbul', 'HH:mm')

  const TITLE = capsContent[locale].title
  const TOPIC = capsContent[locale].topic

  return {
    title: `📢 ${TITLE} 📢`,
    text: `${TOPIC}: ${hashtag?.description}\n\n📅 ${euDate}\n\n🇳🇱 ${euTime}\n🇹🇷 ${trTime}`,
    image: 'https://api.wsvvrijheid.nl/uploads/announcement_5a80e36c27.png',
    shape: 0,
    bg: 'white',
    color: 'black',
    flip: true,
    hasLine: true,
    scale: 0.5,
  }
}
