import {
  about,
  arts,
  collections,
  contact,
  privacy,
  term,
  donation,
  activities,
} from './routes'

export const kunsthalte = {
  headerMenu: [arts, collections, activities, about, contact],
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
        donation,
      ],
      en: 'Menu',
      nl: 'Menu',
      tr: 'Menu',
    },
    {
      children: [arts, collections],
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
