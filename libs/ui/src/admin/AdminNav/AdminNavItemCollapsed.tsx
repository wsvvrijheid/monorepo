import { FC } from 'react'

import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Text,
  Box,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Navigate } from '../../components'
import { AdminNavItemProps } from './types'

export const AdminNavItemCollapsed: FC<AdminNavItemProps> = ({
  label,
  link,
  submenu,
  icon,
}) => {
  const router = useRouter()

  const isMenuLinkActive =
    router.asPath === link || submenu?.some(item => item.link === router.asPath)

  return (
    <Popover placement="right-start" trigger="hover">
      <PopoverTrigger>
        <Navigate
          aria-label={label}
          as={IconButton}
          href={link}
          icon={icon}
          size="lg"
          variant="ghost"
          {...(isMenuLinkActive && {
            colorScheme: 'primary',
            variant: 'solid',
          })}
        />
      </PopoverTrigger>

      <PopoverContent w="max-content">
        <PopoverArrow />
        <PopoverBody>
          <Text fontWeight={600}>{label}</Text>
          {/* Submenu */}
          {submenu && (
            <Box>
              {submenu?.map(item => {
                const isSubmenuLinkActive = router.asPath === item.link
                return (
                  <Navigate
                    _hover={{ color: 'primary.500' }}
                    as={Button}
                    display="flex"
                    size="sm"
                    href={item.link}
                    justifyContent="start"
                    key={item.label}
                    leftIcon={item.icon}
                    variant="ghost"
                    {...(isSubmenuLinkActive && {
                      color: 'primary.500',
                      _hover: { color: 'primary.400' },
                    })}
                  >
                    {item.label}
                  </Navigate>
                )
              })}
            </Box>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
