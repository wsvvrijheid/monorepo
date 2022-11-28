import { chakra } from '@chakra-ui/react'
import NextLink, { type LinkProps as NextLinkProps } from 'next/link'

// wrap the NextLink with Chakra UI's factory function
export const Navigate = chakra<typeof NextLink, Omit<NextLinkProps, 'as'>>(
  NextLink,
  {
    // ensure that you're forwarding all of the required props for your case
    shouldForwardProp: prop => ['href', 'target', 'children'].includes(prop),
  },
)
