import { FC, ReactElement } from 'react'

import { Box, Button, ButtonGroup, Link } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FaGoogle } from 'react-icons/fa'

interface Provider {
  name: string
  icon: ReactElement
  url: string
}

const providers: Provider[] = [
  {
    name: 'Google',
    icon: <Box as={FaGoogle} color="red.500" boxSize="5" />,
    url: '/api/connect/google',
  },
]

const backendUrl = process.env['NX_PUBLIC_API']

export const OAuthButtonGroup: FC<{ isDisabled: boolean }> = ({
  isDisabled,
}) => {
  const { t } = useTranslation()

  const onSocialLogin = async (url: string) => {
    window.open(`${backendUrl}${url}`, '_self')
  }

  return (
    <ButtonGroup
      variant="outline"
      spacing="4"
      width="full"
      isDisabled={isDisabled}
    >
      {providers.map(({ name, icon, url }) => (
        <Button
          as={Link}
          key={name}
          w="full"
          leftIcon={icon}
          colorScheme="red"
          onClick={() => {
            onSocialLogin(url)
          }}
        >
          {t('login.sign-with', { provider: name })}
        </Button>
      ))}
    </ButtonGroup>
  )
}
