import { FC } from 'react'

import {
  Box,
  Button,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
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
        <Navigate href={link as string}>
          <IconButton
            aria-label={label}
            icon={icon}
            size="lg"
            variant="ghost"
            {...(isMenuLinkActive && {
              colorScheme: 'primary',
              variant: 'solid',
            })}
          />
        </Navigate>
      </PopoverTrigger>

      <PopoverContent w="max-content">
        <PopoverArrow />
        <PopoverBody>
          <Text fontWeight="semibold">{label}</Text>
          {/* Submenu */}
          {submenu && (
            <Box>
              {submenu?.map(item => {
                const isSubmenuLinkActive = router.asPath === item.link
                return (
                  <Navigate
                    key={item.label}
                    display="flex"
                    href={item.link as string}
                    justifyContent="start"
                  >
                    <Button
                      justifyContent={'start'}
                      size="sm"
                      _hover={{ color: 'primary.500' }}
                      leftIcon={item.icon}
                      variant="ghost"
                      {...(isSubmenuLinkActive && {
                        color: 'primary.500',
                        _hover: { color: 'primary.400' },
                      })}
                    >
                      {item.label}
                    </Button>
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
