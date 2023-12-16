import { FC } from 'react'

import { SimpleGrid, Stack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Foundation } from '@wsvvrijheid/types'

import { FoundationDetailItem } from './FoundationDetailItem'

type FoundationDetailsProps = {
  foundation: Foundation
}
export const FoundationDetails: FC<FoundationDetailsProps> = ({
  foundation,
}) => {
  const { t } = useTranslation()

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 4 }}
      p={8}
      bg="white"
      gap={8}
      rounded="lg"
      shadow="base"
    >
      <Stack>
        <FoundationDetailItem
          direction={'column'}
          align={'start'}
          textAlign={'left'}
          label={t('address')}
          display={'block'}
          lineHeight={'1.7'}
          value={foundation?.contact?.address}
          alignedLeft
        />
      </Stack>

      <Stack>
        <FoundationDetailItem label={t('email')} value={foundation?.email} />
        <FoundationDetailItem
          label={'Website'}
          value={foundation?.contact?.website}
        />
      </Stack>
      <Stack>
        <FoundationDetailItem label={'BIC'} value={foundation?.BIC} />
        <FoundationDetailItem label={'IBAN'} value={foundation?.IBAN1} />
      </Stack>
      <Stack>
        <FoundationDetailItem label={'KVK'} value={foundation?.KVK} />
        <FoundationDetailItem label={'RSIN'} value={foundation?.RSIN} />
      </Stack>
    </SimpleGrid>
  )
}
