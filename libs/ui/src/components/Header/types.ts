import { ResponsiveValue } from '@chakra-ui/react';
import { ChildMenu, ParentMenu } from '@wsvvrijheid/types';

export type HeaderMenu = Array<ChildMenu | ParentMenu>;

export type ProfileMenuProps = {
  menu: Array<{ label: string; link: string; icon?: JSX.Element }>;
  isLoggedIn: boolean;
  userAvatar: string;
  username: string;
  login: {
    label: string;
    link: string;
  };
  logout: {
    label: string;
    onClick: () => void;
  };
} & Pick<HeaderProps, 'isDark'>;

export interface HeaderProps {
  isDark?: boolean;
  hasScroll?: boolean;
  logo: string;
  headerMenu: HeaderMenu;
  profileMenu: ProfileMenuProps;
  isLoggedIn?: boolean;
}

export interface HeaderNavItemProps {
  item: ChildMenu | ParentMenu;
  isDark?: boolean;
}

export type HeaderMobileNavItemProps = HeaderNavItemProps;

export interface ChildMenuItemProps {
  item: ChildMenu;
  isDark?: boolean;
}

export interface ParentMenuItemProps {
  item: ParentMenu;
  isDark?: boolean;
}

export interface HeaderNavProps {
  direction: ResponsiveValue<
    'row' | 'column' | 'row-reverse' | 'column-reverse'
  >;
  menu: HeaderMenu;
  isDark?: boolean;
}

export type HeaderMobileProps = HeaderProps;

export type HeaderMobileNavProps = Pick<
  HeaderProps,
  'headerMenu' | 'profileMenu'
>;
