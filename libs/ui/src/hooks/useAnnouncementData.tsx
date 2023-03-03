import { Hashtag, StrapiLocale } from '@wsvvrijheid/types'

export const useAnnoucementData = (hashtag: Hashtag, locale: StrapiLocale) => {
  const AnnouncementData = {
    tr: {
      title: 'ETKİNLİK DUYURUSU',
      description: { name: 'Konu:', value: hashtag?.description },
      date: { name: 'Tarih: ', value: hashtag?.date },
      defaultCaps: { url: '' },
      hashtag: {
        name: 'Hashtag: ',
        value:
          hashtag?.hashtagDefault ||
          hashtag?.hashtagExtra ||
          'Hashtag saatinde yayınlanacak.',
      },

      content: hashtag?.content,
      join: 'Hashtag etkinliğine buradan katıl',
    },
    nl: {
      title: 'EVENEMENT AANKONDIGING',
      description: { name: 'Onderwerp:', value: hashtag?.description },
      date: { name: 'Datum: ', value: hashtag?.date },
      defaultCaps: { url: '' },
      hashtag: {
        name: 'Hashtag: ',
        value:
          hashtag?.hashtagDefault ||
          hashtag?.hashtagExtra ||
          'Hashtag wordt op tijd geplaatst',
      },
      content: hashtag?.content,
      join: 'Doe hier mee met het hashtag-evenement',
    },
    en: {
      title: 'EVENT ANNOUNCEMENT',
      description: { name: 'Topic:', value: hashtag?.description },
      date: { name: 'Date: ', value: hashtag?.date },
      defaultCaps: { url: '' },
      hashtag: {
        name: 'Hashtag: ',
        value:
          hashtag?.hashtagDefault ||
          hashtag?.hashtagExtra ||
          'Hashtag will be posted on time',
      },

      content: hashtag?.content,
      join: 'Join the hashtag event here',
    },
  }
  return AnnouncementData?.[locale]
}
