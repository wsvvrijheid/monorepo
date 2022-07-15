import { ProfileMenuProps } from '../components/Header/types';

export const PROFILE: ProfileMenuProps = {
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
};
