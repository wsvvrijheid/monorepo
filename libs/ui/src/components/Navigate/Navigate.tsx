import { FC, forwardRef } from 'react'

import { ButtonProps, IconButtonProps, Link, LinkProps } from '@chakra-ui/react'
import NextLink from 'next/link'

export type NavigateProps = LinkProps &
  ButtonProps &
  Omit<IconButtonProps, 'aria-label'>

export const Navigate: FC<NavigateProps> = forwardRef(
  ({ as: Tag = Link, href, ...rest }, ref) => {
    if (!href) {
      return <Tag ref={ref} {...rest} />
    }

    if (href.startsWith('http')) {
      return (
        <Tag
          ref={ref}
          cursor="pointer"
          as={Link}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          isExternal
          {...rest}
        />
      )
    }

    return (
      <NextLink href={href} passHref>
        <Tag ref={ref} cursor="pointer" {...rest} />
      </NextLink>
    )
  },
)
