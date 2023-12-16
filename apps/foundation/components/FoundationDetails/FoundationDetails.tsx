import { FC } from 'react'

import { SimpleGrid, Stack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Foundation } from '@wsvvrijheid/types'

import { DetailCard } from './DetailCard'

type FoundationDetailsProps = {
  foundation: Foundation
}
export const FoundationDetails: FC<FoundationDetailsProps> = ({
  foundation,
}) => {
  const { t } = useTranslation()

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
      p={8}
      bg="white"
      gap={8}
      rounded="lg"
      shadow="base"
    >
      <Stack>
        <DetailCard
          direction={'column'}
          align={'start'}
          label={t('address')}
          value={foundation?.contact?.address}
        />
      </Stack>

      <Stack>
        <DetailCard label={t('email')} value={foundation?.email} />
        <DetailCard label={'Website'} value={foundation?.contact?.website} />
      </Stack>
      <Stack>
        <DetailCard label={'BIC'} value={foundation?.BIC} />
        <DetailCard label={'IBAN'} value={foundation?.IBAN1} />
      </Stack>
      <Stack>
        <DetailCard label={'KVK'} value={foundation?.KVK} />
        <DetailCard label={'RSIN'} value={foundation?.RSIN} />
      </Stack>
    </SimpleGrid>
  )
}
