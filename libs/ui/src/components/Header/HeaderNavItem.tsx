import { FC } from 'react';

import {
  Box,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Navigate } from '../Navigate/Navigate';
import { ChildMenu, ParentMenu, StrapiLocale } from '@wsvvrijheid/types';
import {
  ChildMenuItemProps,
  HeaderNavItemProps,
  ParentMenuItemProps,
} from './types';
import { useScroll } from '../../hooks';

export const ChildMenuItem: FC<ChildMenuItemProps> = ({ item, isDark }) => {
  const { asPath, locale } = useRouter();
  const isScrolled = useScroll();

  return (
    <Navigate
      href={item.link}
      fontWeight={600}
      p={2}
      color={
        item.link !== '/' && asPath.includes(item.link)
          ? 'primary.400'
          : !isScrolled && isDark
          ? 'white'
          : 'gray.700'
      }
      _hover={{
        color: !isScrolled && isDark ? 'whiteAlpha.800' : 'primary.400',
      }}
    >
      {item[(locale as StrapiLocale) || 'en']}
    </Navigate>
  );
};

export const ParentMenuItem: FC<ParentMenuItemProps> = ({ item, isDark }) => {
  return (
    <Popover trigger="hover" arrowSize={16}>
      <PopoverTrigger>
        <Box p={2} w="max-content">
          <ChildMenuItem item={item as ChildMenu} isDark={isDark} />
        </Box>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Stack>
            {item.children.map((item) => (
              <Box py={1} key={item.link}>
                <ChildMenuItem item={item} isDark={false} />
              </Box>
            ))}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export const HeaderNavItem: FC<HeaderNavItemProps> = ({ item, isDark }) => {
  const parentLink = item as ParentMenu;
  const childLink = item as ChildMenu;
  const isParentLink = !!parentLink.children;

  if (isParentLink) {
    return <ParentMenuItem item={parentLink} isDark={isDark} />;
  }

  return <ChildMenuItem item={childLink} isDark={isDark} />;
};
