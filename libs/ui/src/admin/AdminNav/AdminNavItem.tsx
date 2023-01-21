import { FC, memo, useEffect } from 'react'

import { Box, Button, chakra, Collapse, useBoolean } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { GoChevronDown } from 'react-icons/go'

import { AdminNavItemProps } from './types'
import { Navigate } from '../../components'

export const AdminNavItem: FC<AdminNavItemProps> = memo(
  ({ label, link, submenu, icon }) => {
    const [open, setOpen] = useBoolean(false)

    const router = useRouter()

    const isMenuLinkActive =
      router.asPath === link ||
      submenu?.some(item => item.link === router.asPath)

    useEffect(() => {
      if (isMenuLinkActive && submenu && !open) {
        setOpen.on()
      }
    }, [isMenuLinkActive, open, setOpen, submenu])

    return (
      <Box w="full">
        <Navigate href={link as string}>
          <Button
            justifyContent={'start'}
            leftIcon={icon}
            variant="ghost"
            rounded="0"
            w="full"
            px={4}
            _hover={{ color: 'primary.500', bg: 'blackAlpha.50' }}
            {...(isMenuLinkActive && {
              color: 'primary.500',
              _hover: { color: 'primary.400', bg: 'blackAlpha.50' },
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
          </Button>
        </Navigate>

        {/* Submenu */}
        {submenu && (
          <Collapse in={open}>
            {submenu?.map((item, index) => {
              const isSubmenuLinkActive = router.asPath === item.link
              return (
                <Box key={index}>
                  <Navigate
                    href={item.link as string}
                    justifyContent="start"
                    key={item.link}
                    ml={8}
                  >
                    <Button
                      justifyContent={'start'}
                      leftIcon={item.icon}
                      size="sm"
                      variant="ghost"
                      w="full"
                      px={2}
                      _hover={{ color: 'primary.500' }}
                      {...(isSubmenuLinkActive && {
                        color: 'primary.500',
                        _hover: { color: 'primary.400' },
                      })}
                    >
                      {item.label}
                    </Button>
                  </Navigate>
                </Box>
              )
            })}
          </Collapse>
        )}
      </Box>
    )
  },
)
