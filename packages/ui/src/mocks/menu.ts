import { ROUTES } from '@wsvvrijheid/config'

import { HeaderNavProps } from '../components/Header/types'

const {
  activities,
  platforms,
  lotus,
  artStop,
  samenvvv,
  academy,
  blogs,
  club,
  about,
  contact,
  term,
  privacy,
} = ROUTES

export const HEADER_MENU: Pick<HeaderNavProps, 'menu'>['menu'] = [
  activities,
  {
    link: platforms.link,
    en: platforms.en,
    nl: platforms.nl,
    tr: platforms.tr,
    children: [lotus, artStop, samenvvv, academy],
  },
  blogs,
  club,
  {
    link: '/',
    en: 'Wsvvrijheid',
    nl: 'Wsvvrijheid',
    tr: 'Wsvvrijheid',
    children: [about, contact],
  },
]

export const FOOTER_MENU = [
  {
    children: [lotus, artStop, samenvvv, academy],
    en: platforms.en,
    nl: platforms.nl,
    tr: platforms.tr,
  },
  {
    children: [about, contact],
    en: 'Foundation',
    nl: 'Stichting',
    tr: 'Vakıf',
  },
  {
    children: [club, activities],
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
]
