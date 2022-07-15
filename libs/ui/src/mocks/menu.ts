import { ROUTES } from '@wsvvrijheid/config';
import { HeaderNavProps } from '../components/Header/types';

const {
  activity,
  platform,
  lotus,
  artStop,
  samenvvv,
  academy,
  blog,
  club,
  volunteer,
  about,
  contact,
  terms,
  privacy,
} = ROUTES;

export const HEADER_MENU: Pick<HeaderNavProps, 'menu'>['menu'] = [
  activity,
  {
    link: platform.link,
    en: platform.en,
    nl: platform.nl,
    tr: platform.tr,
    children: [lotus, artStop, samenvvv, academy],
  },
  blog,
  club,
  {
    link: '/',
    en: 'Wsvvrijheid',
    nl: 'Wsvvrijheid',
    tr: 'Wsvvrijheid',
    children: [volunteer, about, contact],
  },
];

export const FOOTER_MENU = [
  {
    children: [lotus, artStop, samenvvv, academy],
    en: platform.en,
    nl: platform.nl,
    tr: platform.tr,
  },
  {
    children: [about, contact],
    en: 'Foundation',
    nl: 'Stichting',
    tr: 'Vakıf',
  },
  {
    children: [club, activity, volunteer],
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
];
