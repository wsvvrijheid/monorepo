import { FC, forwardRef } from 'react'

import { Link, LinkProps } from '@chakra-ui/react'
import NextLink from 'next/link'

export type NavigateProps = LinkProps

export const Navigate: FC<NavigateProps> = forwardRef(
  ({ as: Tag = Link, href, children, ...rest }, ref) => {
    if (href) {
      if (href.startsWith('/')) {
        return (
          <NextLink href={href} passHref>
            <Tag ref={ref} cursor="pointer" {...rest}>
              {children}
            </Tag>
          </NextLink>
        )
      }

      return (
        <Tag
          ref={ref}
          cursor="pointer"
          as={Link}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...rest}
          isExternal
        >
          {children}
        </Tag>
      )
    }

    return (
      <Link {...rest} isExternal>
        {children}
      </Link>
    )
  },
)
