import { StrapiLocale } from '@wsvvrijheid/types';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Navigate } from '../Navigate/Navigate';
import { FooterNavItemProps } from './types';

export const FooterNavItem: FC<FooterNavItemProps> = ({ item }) => {
  const { locale } = useRouter();
  return (
    <Navigate
      color="blue.100"
      _hover={{
        color: 'blue.50',
      }}
      key={item.link}
      href={item.link}
    >
      {item[(locale as StrapiLocale) || 'en']}
    </Navigate>
  );
};
