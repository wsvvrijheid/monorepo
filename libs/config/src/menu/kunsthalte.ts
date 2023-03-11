import {
  about,
  art,
  collection,
  contact,
  privacy,
  terms,
  donate,
} from './routes'

export const kunsthalte = {
  headerMenu: [art, collection, about, contact, donate],
  footerMenu: [
    {
      children: [
        contact,
        about,
        {
          link: 'https://wsvvrijheid.nl',
          tr: 'Vakıf',
          en: 'Foundation',
          nl: 'Stichting',
        },
        donate,
      ],
      en: 'Menu',
      nl: 'Menu',
      tr: 'Menu',
    },
    {
      children: [art, collection],
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
  },
}
