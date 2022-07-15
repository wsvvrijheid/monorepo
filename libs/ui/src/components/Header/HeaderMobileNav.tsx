import { Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { HeaderMobileNavItem } from './HeaderMobileNavItem';
import { HeaderMobileNavProps } from './types';

export const HeaderMobileNav: FC<HeaderMobileNavProps> = ({ headerMenu }) => {
  return (
    <Stack spacing={0}>
      {headerMenu.map((item, i) => {
        return <HeaderMobileNavItem key={i} item={item} />;
      })}
    </Stack>
  );
};
