import {
  announcements,
  about,
  contact,
  foundation,
  hashtags,
  privacy,
  term,
} from './routes'

export const samenvvv = {
  headerMenu: [announcements, hashtags, about, contact, foundation],
  footerMenu: [
    {
      children: [foundation, about, contact],
      en: 'Menu',
      nl: 'Menu',
      tr: 'Menu',
    },
    {
      children: [hashtags],
      en: 'Menu',
      nl: 'Menu',
      tr: 'Menu',
    },
    {
      children: [term, privacy],
      en: 'Support',
      nl: 'Steun',
      tr: 'Destek',
    },
  ],
}
