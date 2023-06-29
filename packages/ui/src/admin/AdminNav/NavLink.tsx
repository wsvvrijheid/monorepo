import { FC } from 'react'

import { Button } from '@chakra-ui/react'

import { NavLinkProps } from './types'
import { Navigate } from '../../components'

export const NavLink: FC<NavLinkProps> = ({ href, children, ...rest }) =>
  href ? (
    <Navigate href={href}>
      <Button variant={'unstyled'} w={'full'} {...rest}>
        {children}
      </Button>
    </Navigate>
  ) : (
    <Button variant={'unstyled'} w={'full'} {...rest}>
      {children}
    </Button>
  )
