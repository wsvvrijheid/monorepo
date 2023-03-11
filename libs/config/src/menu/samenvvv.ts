import {
  about,
  contact,
  donate,
  foundation,
  hashtag,
  privacy,
  terms,
} from './routes'

export const samenvvv = {
  headerMenu: [hashtag, about, contact, foundation, donate],
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
