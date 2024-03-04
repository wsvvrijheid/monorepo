import { ROUTES } from '@fc/config'

import { HeaderNavProps } from '../components/Header/types'

const {
  activities,
  platforms,
  lotus,
  artStop,
  'trend-rights': trendRights,
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
    children: [lotus, artStop, trendRights, academy],
  },
  blogs,
  club,
  {
    link: '/',
    en: 'Freedom Combination',
    nl: 'Freedom Combination',
    tr: 'Freedom Combination',
    children: [about, contact],
  },
]

export const FOOTER_MENU = [
  {
    children: [lotus, artStop, trendRights, academy],
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
