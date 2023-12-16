import { FC } from 'react'

import { Stack, HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Foundation } from '@wsvvrijheid/types'

import { DetailsCard } from './DetailsCard'

interface FoundationDetailsCard {
  foundation: Foundation
}
export const FoundationDetailsCard: FC<FoundationDetailsCard> = ({
  foundation,
}) => {
  const { t } = useTranslation()

  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      align={{ base: 'center', lg: 'start' }}
      p={8}
      spacing={4}
      bg="white"
      rounded="lg"
      shadow="base"
    >
      <HStack align={{ base: 'center', lg: 'start' }}>
        <DetailsCard
          label={t('address')}
          value={foundation?.contact?.address}
        />
        <VStack direction={{ base: 'column', lg: 'row' }}>
          <DetailsCard label={t('email')} value={foundation?.email} />
          <DetailsCard label={'Website'} value={foundation?.contact?.website} />
        </VStack>

        <VStack
          direction={{ base: 'column', lg: 'row' }}
          align={{ base: 'center', lg: 'start' }}
        >
          <DetailsCard label={'IBAN'} value={foundation?.IBAN1} />
          <DetailsCard label={'BIC'} value={foundation?.BIC} />
        </VStack>

        <VStack
          direction={{ base: 'column', lg: 'row' }}
          align={{ base: 'center', lg: 'start' }}
        >
          <DetailsCard label={'KVK'} value={foundation?.KVK} />
          <DetailsCard label={'RSIN'} value={foundation?.RSIN} />
        </VStack>
      </HStack>
    </Stack>
  )
}
