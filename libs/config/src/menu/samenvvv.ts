import {
  announcement,
  about,
  contact,
  foundation,
  hashtag,
  privacy,
  terms,
} from './routes'

export const samenvvv = {
  headerMenu: [announcement, hashtag, about, contact, foundation],
  footerMenu: [
    {
      children: [foundation, about, contact],
      en: 'Menu',
      nl: 'Menu',
      tr: 'Menu',
    },
    {
      children: [hashtag],
      en: 'Menu',
      nl: 'Menu',
      tr: 'Menu',
    },
    {
      children: [terms, privacy],
      en: 'Support',
      nl: 'Steun',
      tr: 'Destek',
    },
  ],
}
