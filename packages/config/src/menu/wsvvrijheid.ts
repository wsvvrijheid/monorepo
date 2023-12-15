import {
  about,
  academy,
  activities,
  artStop,
  blogs,
  club,
  contact,
  anbi,
  donation,
  join,
  lotus,
  platforms,
  privacy,
  samenvvv,
  term,
  music,
} from './routes'

export const wsvvrijheid = {
  headerMenu: [
    activities,
    {
      link: platforms?.link,
      en: platforms?.en,
      nl: platforms?.nl,
      tr: platforms?.tr,
      children: [samenvvv, artStop, lotus, academy, music],
    },
    blogs,
    club,
    {
      link: '/',
      en: 'Wsvvrijheid',
      nl: 'Wsvvrijheid',
      tr: 'Wsvvrijheid',
      children: [about, contact, join, anbi],
    },
  ],
  footerMenu: [
    {
      children: [samenvvv, artStop, lotus, academy, music],
      en: platforms?.en,
      nl: platforms?.nl,
      tr: platforms?.tr,
    },
    {
      children: [about, contact, join],
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
      children: [term, privacy, donation],
      en: 'Support',
      nl: 'Steun',
      tr: 'Destek',
    },
  ],
  profileMenu: {
    isLoggedIn: false,
    menu: [
      {
        label: 'Profile',
        link: '/profile',
      },
    ],
    login: {
      label: 'Login',
      link: '/login',
    },
    logout: {
      label: 'Logout',
      onClick: () => alert('Logout'),
    },
    username: 'John Doe',
    userAvatar: 'https://placekitten.com/200/200',
  },
}
