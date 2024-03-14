import { FC } from 'react'

import { Stack } from '@chakra-ui/react'

import { useAuthContext } from '@fc/context'
import { getRoutePermission } from '@fc/utils'

import { AdminNavItem } from './AdminNavItem'
import { AdminNavItemProps, AdminNavProps } from './types'
import { useAdminNav } from './useAdminNav'

export const AdminNav: FC<AdminNavProps> = ({ mobile }) => {
  const navItems = useAdminNav()
  const { roles } = useAuthContext()

  const filterNavs = (item: AdminNavItemProps) => {
    return item.link ? getRoutePermission(roles, item.link) : true
  }

  return (
    <Stack spacing={0}>
      {navItems.filter(filterNavs).map((item, index) => {
        const submenu = item.submenu?.filter(filterNavs)

        return (
          <AdminNavItem
            icon={item.icon}
            key={index}
            label={item.label}
            link={item.link}
            submenu={submenu}
            mobile={mobile}
          />
        )
      })}
    </Stack>
  )
}

AdminNav.displayName = 'AdminNav'
