import { Layout as AppLayout } from '@wsvvrijheid/ui';
import { NextSeoProps } from 'next-seo';

import { FC, PropsWithChildren } from 'react';
import { menus, socialLinks } from '@wsvvrijheid/config';

interface LayoutProps extends PropsWithChildren {
  isDark?: boolean;
  isLoading?: boolean;
  hasScroll?: boolean;
  seo: NextSeoProps;
}

export const Layout: FC<LayoutProps> = ({
  children,
  isDark,
  isLoading,
  hasScroll,
  seo,
}) => {
  return (
    <AppLayout
      seo={seo}
      logo="https://wsvvrijheid.nl/images/logo.svg"
      headerProps={{
        headerMenu: menus.wsvvrijheid.headerMenu,
        profileMenu: menus.wsvvrijheid.profileMenu,
        isDark,
        hasScroll,
      }}
      footerProps={{
        menu: menus.wsvvrijheid.footerMenu,
        about: 'About',
        socialItems: socialLinks.wsvvrijheid,
      }}
      isDark={isDark}
      isLoading={isLoading}
    >
      {children}
    </AppLayout>
  );
};
