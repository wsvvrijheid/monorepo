import {
  Button,
  Icon,
  Square,
  Stack,
  StackProps,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Trans, useTranslation } from 'next-i18next'
import { BiCookie } from 'react-icons/bi'

import { Navigate } from '../Navigate'

export type CookieBannerProps = StackProps & {
  onAllow?: () => void
}

const CookieBanner = (props: CookieBannerProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const { onAllow } = props
  const { t } = useTranslation()

  return (
    <Stack
      justify="center"
      align={'center'}
      spacing="4"
      p="4"
      direction={{ base: 'column', sm: 'row' }}
      bg="gray.900"
      rounded={'md'}
      boxShadow="sm"
      position="fixed"
      bottom="2"
      right="2"
      left="2"
    >
      {!isMobile && (
        <Square size="12" borderRadius="md">
          <Icon as={BiCookie} boxSize="6" color={'primary.400'} />
        </Square>
      )}
      <Text color="white" fontSize={{ base: 'sm', md: 'md' }}>
        <Trans
          i18nKey={'cookie.text'}
          components={{
            a: <Navigate href="/privacy" />,
          }}
        />
      </Text>
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        spacing={{ base: '3', sm: '2' }}
        align={{ base: 'stretch', sm: 'center' }}
        sx={{
          ...(isMobile && { width: '100%' }),
        }}
      >
        <Button size="sm" flexShrink={0} onClick={onAllow}>
          {t('cookie.button')}
        </Button>
      </Stack>
    </Stack>
  )
}

export default CookieBanner
