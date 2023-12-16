import { MenuType } from '@wsvvrijheid/types'

type PlatformRouteKey = 'lotus' | 'artStop' | 'music' | 'samenvvv' | 'academy'

type SiteRouteKey =
  | 'sign-up'
  | 'join'
  | 'club'
  | 'about'
  | 'contact'
  | 'donation'
  | 'dashboard'
  | 'foundation'

type EndpointRouteKey =
  | 'activities'
  | 'announcements'
  | 'arts'
  | 'blogs'
  | 'collections'
  | 'hashtags'
  | 'platforms'
  | 'presentations'
  | 'privacy'
  | 'term'

export type RouteKey = EndpointRouteKey | SiteRouteKey | PlatformRouteKey

export const ROUTES: Record<RouteKey, MenuType> = {
  arts: {
    link: '/club/arts',
    en: 'Arts',
    nl: 'Kunsten',
    tr: 'Eserler',
  },
  dashboard: {
    link: 'https://dashboard.wsvvrijheid.nl',
    en: 'Dashboard',
    nl: 'Dashboard',
    tr: 'Kontrol Paneli',
    isExternal: true,
  },
  hashtags: {
    link: '/hashtags',
    en: 'Hashtags',
    nl: 'Hashtags',
    tr: 'Hashtagler',
  },
  collections: {
    link: '/club/collections',
    en: 'Collections',
    nl: 'Collecties',
    tr: 'Koleksiyonlar',
  },
  foundation: {
    link: 'https://wsvvrijheid.nl',
    en: 'Foundation',
    nl: 'Stichting',
    tr: 'Vakıf',
  },
  platforms: {
    link: '/platforms',
    en: 'Platforms',
    nl: 'Platformen',
    tr: 'Platformlar',
  },
  activities: {
    link: '/activities',
    en: 'Activities',
    nl: 'Activiteiten',
    tr: 'Etkinlikler',
  },
  lotus: {
    link: '/platforms/lotus',
    en: 'Lotus van de Media',
    nl: 'Lotus van de Media',
    tr: 'Lotus van de Media',
  },
  artStop: {
    link: '/platforms/kunsthalte',
    en: 'Art Station',
    nl: 'Kunsthalte',
    tr: 'Sanat Durağı',
  },
  music: {
    link: '/platforms/weesmusic',
    en: 'Wees Music',
    nl: 'Wees Muziek',
    tr: 'Wees Muzik',
  },
  samenvvv: {
    link: '/platforms/samenvvv',
    en: 'Samenvvv',
    nl: 'Samenvvv',
    tr: 'Samenvvv',
  },
  academy: {
    link: '/platforms/academy',
    en: 'Wees Academy',
    nl: 'Wees Academie',
    tr: 'Wees Akademi',
  },
  blogs: {
    link: '/blog',
    en: 'Blog',
    nl: 'Blog',
    tr: 'Blog',
  },
  announcements: {
    link: '/announcements',
    en: 'Announcements',
    nl: 'Aankondigingen',
    tr: 'Duyurular',
  },
  club: {
    link: '/club',
    en: 'Club',
    nl: 'Club',
    tr: 'Kulüp',
  },
  about: {
    link: '/about-us',
    en: 'About Us',
    nl: 'Over Ons',
    tr: 'Hakkımızda',
  },
  donation: {
    link: '/donation',
    en: 'Donation',
    nl: 'Donatie',
    tr: 'Bağış',
  },
  term: {
    link: '/terms',
    en: 'Terms of service',
    nl: 'Algemene Voorwaarden ',
    tr: 'Kullanım Şartları',
  },
  privacy: {
    link: '/privacy',
    en: 'Privacy Policy',
    nl: 'Privacybeleid',
    tr: 'Gizlilik Politikası',
  },
  presentations: {
    link: '/presentations',
    en: 'Presentations',
    nl: 'Presentaties',
    tr: 'Sunumlar',
  },
  contact: {
    link: '/contact',
    en: 'Contact',
    nl: 'Contact',
    tr: 'İletişim',
  },
  'sign-up': {
    link: '/sign-up',
    en: 'Sign-Up',
    nl: 'Aanmelden',
    tr: 'Kayıt ol',
  },
  join: {
    link: '/join',
    en: 'Become a Volunteer',
    nl: 'Word Vrijwilliger',
    tr: 'Gönüllü Ol',
  },
}
