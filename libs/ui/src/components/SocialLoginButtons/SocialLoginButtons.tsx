import { FC } from 'react'

import {
  Box,
  Button,
  ButtonGroup,
  ButtonGroupProps,
  Link,
} from '@chakra-ui/react'
import { API_URL } from '@wsvvrijheid/config'
import { useTranslation } from 'next-i18next'
import { FaFacebook, FaGoogle, FaInstagram, FaTwitter } from 'react-icons/fa'

import { SocialProvider, SocialProviderName } from './type'

const loginProviders: SocialProvider[] = [
  {
    name: 'Google',
    icon: <Box as={FaGoogle} color="red.500" boxSize="5" />,
    url: '/api/connect/google',
  },
  {
    name: 'Facebook',
    icon: <Box as={FaFacebook} color="facebook.500" boxSize="5" />,
    url: '/api/connect/facebook',
  },
  {
    name: 'Twitter',
    icon: <Box as={FaTwitter} color="twitter.500" boxSize="5" />,
    url: '/api/connect/twitter',
  },
  {
    name: 'Instagram',
    icon: <Box as={FaInstagram} color="purple.500" boxSize="5" />,
    url: '/api/connect/instagram',
  },
]

export type SocialLoginButtonsProps = ButtonGroupProps & {
  providersToBeShown?: SocialProviderName[]
}

export const SocialLoginButtons: FC<SocialLoginButtonsProps> = ({
  providersToBeShown = [],
  ...rest
}) => {
  const { t } = useTranslation()

  if (!providersToBeShown.length) {
    return null
  }

  const onSocialLogin = async (url: string) => {
    window.open(`${API_URL}${url}`, '_self')
  }

  const providers = loginProviders.filter(provider =>
    providersToBeShown.includes(
      provider.name.toLowerCase() as SocialProviderName,
    ),
  )

  return (
    <ButtonGroup variant="outline" spacing="4" width="full" {...rest}>
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
