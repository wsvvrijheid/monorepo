import { FC } from 'react'

import { Button } from '@chakra-ui/react'

import { NavLinkProps } from './types'
import { Navigate } from '../../components'

export const NavLink: FC<NavLinkProps> = ({ href, children }) =>
  href ? (
    <Navigate href={href}>{children}</Navigate>
  ) : (
    <Button variant={'unstyled'} w={'full'}>
      {children}
    </Button>
  )
