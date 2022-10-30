import * as React from 'react'

import {
  Button,
  CloseButton,
  Icon,
  Link,
  Square,
  Stack,
  StackProps,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { BiCookie } from 'react-icons/bi'

import { Navigate } from '../Navigate'

export type CookieBannerProps = StackProps & {
  onClose?: () => void
  onAllow?: () => void
  onReject?: () => void
}

export const CookieBanner = (props: CookieBannerProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const { onClose, onAllow, onReject, ...rest } = props

  return (
    <Stack
      justify="center"
      align={'center'}
      spacing="4"
      p="4"
      direction={{ base: 'column', sm: 'row' }}
      bg="gray.700"
      rounded={'md'}
      boxShadow="sm"
      {...rest}
    >
      {onClose && (
        <CloseButton
          display={{ sm: 'none' }}
          position="absolute"
          right="2"
          top="2"
          color={'lightgray'}
          onClick={onClose}
        />
      )}

      {!isMobile && (
        <Square size="12" bg="lightgray" borderRadius="md">
          <Icon as={BiCookie} boxSize="6" color={'blue.400'} />
        </Square>
      )}
      <Text color="white" fontSize={{ base: 'sm', md: 'md' }}>
        By using our website, you agree to the use of cookies as described in
        our{' '}
        <Navigate
          _hover={{ transform: 'scale(2.1)', color: 'blue.400' }}
          as={Link}
          href="#"
        >
          Cookie Policy
        </Navigate>
      </Text>
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        spacing={{ base: '3', sm: '2' }}
        align={{ base: 'stretch', sm: 'center' }}
        sx={{
          ...(isMobile && { width: '100%' }),
        }}
      >
        {onReject && (
          <Button
            bg="white"
            color="black"
            _hover={{ bg: 'gray.100' }}
            size="sm"
            flexShrink={0}
            onClick={onReject}
          >
            Reject
          </Button>
        )}

        <Button
          colorScheme={'primary'}
          size="sm"
          flexShrink={0}
          onClick={onAllow}
        >
          Allow
        </Button>
        {onClose && (
          <CloseButton
            color={'lightgray'}
            display={{ base: 'none', sm: 'inline-flex' }}
            onClick={onClose}
          />
        )}
      </Stack>
    </Stack>
  )
}
