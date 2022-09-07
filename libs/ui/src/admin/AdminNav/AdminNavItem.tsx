import { FC, useEffect } from 'react'

import { chakra, Button, useBoolean, Collapse, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { GoChevronDown } from 'react-icons/go'

import { Navigate } from '../../components'
import { AdminNavItemProps } from './types'

export const AdminNavItem: FC<AdminNavItemProps> = ({
  label,
  link,
  submenu,
  icon,
}) => {
  const [open, setOpen] = useBoolean(false)
  const router = useRouter()

  const isMenuLinkActive =
    router.asPath === link || submenu?.some(item => item.link === router.asPath)

  useEffect(() => {
    if (isMenuLinkActive && submenu) {
      setOpen.on()
    }
  }, [isMenuLinkActive, setOpen, submenu])

  return (
    <Box w="full">
      <Navigate
        display="flex"
        _hover={{ color: 'primary.500' }}
        as={Button}
        href={link}
        leftIcon={icon}
        px={2}
        size="lg"
        variant="ghost"
        w="full"
        {...(isMenuLinkActive && {
          color: 'primary.500',
          _hover: { color: 'primary.400' },
        })}
        {...(submenu && {
          onClick: setOpen.toggle,
          rightIcon: (
            <Box
              as={GoChevronDown}
              transition="all 0.2s"
              {...(open && {
                transform: 'rotate(180deg)',
              })}
            />
          ),
        })}
      >
        <chakra.span flex={1} textAlign="left">
          {label}
        </chakra.span>
      </Navigate>

      {/* Submenu */}
      {submenu && (
        <Collapse in={open}>
          {submenu?.map(item => {
            const isSubmenuLinkActive = router.asPath === item.link
            return (
              <Navigate
                _hover={{ color: 'primary.500' }}
                as={Button}
                href={item.link}
                justifyContent="start"
                key={item.label}
                leftIcon={item.icon}
                ml={8}
                px={2}
                variant="ghost"
                w="full"
                {...(isSubmenuLinkActive && {
                  color: 'primary.500',
                  _hover: { color: 'primary.400' },
                })}
              >
                {item.label}
              </Navigate>
            )
          })}
        </Collapse>
      )}
    </Box>
  )
}
