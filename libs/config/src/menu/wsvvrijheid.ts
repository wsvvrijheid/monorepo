import {
  about,
  academy,
  activity,
  artStop,
  blog,
  club,
  contact,
  dashboard,
  donation,
  join,
  lotus,
  platform,
  privacy,
  samenvvv,
  terms,
  music,
} from './routes'

export const wsvvrijheid = {
  headerMenu: [
    activity,
    {
      link: platform.link,
      en: platform.en,
      nl: platform.nl,
      tr: platform.tr,
      children: [samenvvv, artStop, lotus, academy, music],
    },
    blog,
    club,
    {
      link: '/',
      en: 'Wsvvrijheid',
      nl: 'Wsvvrijheid',
      tr: 'Wsvvrijheid',
      children: [about, contact, join],
    },
    donation,
  ],
  footerMenu: [
    {
      children: [samenvvv, artStop, lotus, academy, music],
      en: platform.en,
      nl: platform.nl,
      tr: platform.tr,
    },
    {
      children: [about, contact, join, dashboard],
      en: 'Foundation',
      nl: 'Stichting',
      tr: 'Vakıf',
    },
    {
      children: [club, activity],
      en: 'Menu',
      nl: 'Menu',
      tr: 'Menu',
    },
    {
      children: [terms, privacy, donation],
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
