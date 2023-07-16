import { FC, memo } from 'react'

import { Stack } from '@chakra-ui/react'

import { useAuthContext } from '@wsvvrijheid/context'
import { getRoutePermission } from '@wsvvrijheid/utils'

import { AdminNavItem } from './AdminNavItem'
import { AdminNavItemCollapsed } from './AdminNavItemCollapsed'
import { AdminNAvProps, AdminNavItemProps } from './types'
import { useAdminNav } from './useAdminNav'

export const AdminNav: FC<AdminNAvProps> = memo(({ expanded }) => {
  const navItems = useAdminNav()
  const { roles } = useAuthContext()

  const filterNavs = (item: AdminNavItemProps) => {
    return item.link ? getRoutePermission(roles, item.link) : true
  }

  return (
    <Stack spacing={0}>
      {navItems.filter(filterNavs).map((item, index) => {
        const NavItem = expanded ? AdminNavItem : AdminNavItemCollapsed
        const submenu = item.submenu?.filter(filterNavs)

        return (
          <NavItem
            icon={item.icon}
            key={index}
            label={item.label}
            link={item.link}
            submenu={submenu}
            expanded={expanded}
          />
        )
      })}
    </Stack>
  )
})

AdminNav.displayName = 'AdminNav'
