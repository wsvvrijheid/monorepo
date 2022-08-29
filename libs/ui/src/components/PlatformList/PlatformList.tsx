import React, { FC } from 'react'

import { Avatar, Button, Heading, Spacer, Stack, Text } from '@chakra-ui/react'
import { API_URL } from '@wsvvrijheid/config'
import { Platform, StrapiLocale } from '@wsvvrijheid/types'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FaChevronRight } from 'react-icons/fa'

import { Navigate } from '../Navigate'

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
          shadow="md"
        >
          {/* TODO Create image component to handle internal/external image paths */}
          <Avatar size="2xl" src={`${API_URL}${platform.image?.url}`} />
          <Stack align={{ base: 'center', lg: 'start' }}>
            <Heading textAlign="center" size="md" as="h3" fontWeight={900}>
              {platform[`name_${locale as StrapiLocale}`]}
            </Heading>
            <Text fontSize="sm">
              {platform[`description_${locale as StrapiLocale}`]}
            </Text>
            <Spacer />

            <Navigate href={`/${locale}/platforms/${platform.slug}`}>
              <Button
                rightIcon={<FaChevronRight />}
                variant="link"
                colorScheme="blue"
              >
                {t`read-more`}
              </Button>
            </Navigate>
          </Stack>
        </Stack>
      ))}
    </Stack>
  )
}
