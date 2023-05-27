import { FC, memo } from 'react'

import { Stack } from '@chakra-ui/react'

import { AdminNavItem } from './AdminNavItem'
import { AdminNavItemCollapsed } from './AdminNavItemCollapsed'
import { AdminNAvProps } from './types'
import { useAdminNav } from './useAdminNav'

export const AdminNav: FC<AdminNAvProps> = memo(({ user, expanded }) => {
  const navItems = useAdminNav(user)

  return (
    <Stack spacing={0}>
      {navItems
        .filter(item => item.visible) // TODO enable this when we are ready to release
        .map((item, index) => {
          const NavItem = expanded ? AdminNavItem : AdminNavItemCollapsed

          return (
            <NavItem
              icon={item.icon}
              key={index}
              label={item.label}
              link={item.link}
              submenu={item.submenu}
              expanded={expanded}
              visible={item.visible}
            />
          )
        })}
    </Stack>
  )
})

AdminNav.displayName = 'AdminNav'
