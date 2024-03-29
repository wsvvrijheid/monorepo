import { FC } from 'react'

import { Button, Heading, Spacer, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaChevronRight } from 'react-icons/fa'

import { ASSETS_URL } from '@fc/config'
import { Platform } from '@fc/types'

import { Navigate } from '../Navigate'
import { WAvatar } from '../WAvatar'

export interface PlatformListProps {
  platforms: Platform[]
}

export const PlatformList: FC<PlatformListProps> = ({ platforms }) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <Stack spacing={8}>
      {platforms.map(platform => (
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          align={{ base: 'center', lg: 'start' }}
          key={platform.slug}
          p={8}
          spacing={4}
          bg="white"
          rounded="lg"
          shadow="base"
        >
          {/* TODO Create image component to handle internal/external image paths */}
          <WAvatar size="2xl" src={`${ASSETS_URL}${platform.image?.url}`} />
          <Stack align={{ base: 'center', lg: 'start' }}>
            <Heading textAlign="center" size="md" as="h3" fontWeight={900}>
              {platform[`name_${locale}`]}
            </Heading>
            <Text fontSize="sm">{platform[`description_${locale}`]}</Text>
            <Spacer />

            <Button
              as={Navigate}
              href={`/${locale}/platforms/${platform.slug}`}
              rightIcon={<FaChevronRight />}
              variant="link"
            >
              {t('read-more')}
            </Button>
          </Stack>
        </Stack>
      ))}
    </Stack>
  )
}
