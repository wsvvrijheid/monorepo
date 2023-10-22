import { FC } from 'react'

import {
  MenuDivider,
  MenuItemOption,
  MenuOptionGroup,
  Stack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { ApprovalStatus, DonationsStatus } from '@wsvvrijheid/types'

type ModelStatusFiltersProps = {
  status: ApprovalStatus | 'all'
  setStatus: (status: ApprovalStatus) => void
  published: string
  setPublished: (published: string) => void
  showApprovalStatus?: boolean
  showPublicationState?: boolean
  // for Donations Page
  donatStatus: DonationsStatus | 'all'
  setDonationStatus: (donatStatus: DonationsStatus) => void
  showDonationsStatus?: boolean
}

export const ModelStatusFilters: FC<ModelStatusFiltersProps> = ({
  status,
  donatStatus,
  setStatus,
  setDonationStatus,
  published,
  setPublished,
  showApprovalStatus,
  showDonationsStatus,
  showPublicationState,
}) => {
  const { t } = useTranslation()

  if (!showApprovalStatus && !showPublicationState && !showDonationsStatus)
    return null

  return (
    <Stack
      p={2}
      bg={'white'}
      rounded={'sm'}
      shadow={'sm'}
      overflowX={'auto'}
      flexShrink={0}
    >
      {showApprovalStatus && (
        <MenuOptionGroup
          value={status || 'all'}
          onChange={val => setStatus(val as ApprovalStatus)}
          title={t('approvalStatus')}
        >
          <MenuItemOption value={'all'}>All</MenuItemOption>
          <MenuItemOption value={'approved'}>Approved</MenuItemOption>
          <MenuItemOption value={'pending'}>Pending</MenuItemOption>
          <MenuItemOption value={'rejected'}>Rejected</MenuItemOption>
        </MenuOptionGroup>
      )}

      {showDonationsStatus && (
        <MenuOptionGroup
          value={donatStatus || 'all'}
          onChange={val => setDonationStatus(val as DonationsStatus)}
          title={t('donationsStatus')}
        >
          <MenuItemOption value={'all'}>All</MenuItemOption>
          <MenuItemOption value={'paid'}>Paid</MenuItemOption>
          <MenuItemOption value={'canceled'}>Canceled</MenuItemOption>
          <MenuItemOption value={'expired'}>Expired</MenuItemOption>
        </MenuOptionGroup>
      )}

      {showApprovalStatus && showPublicationState && <MenuDivider />}

      {showPublicationState && (
        <MenuOptionGroup
          value={published || 'true'}
          onChange={val => setPublished(val as string)}
          title={t('publish')}
        >
          <MenuItemOption value={'all'}>All</MenuItemOption>
          <MenuItemOption value={'true'}>Live</MenuItemOption>
          <MenuItemOption value={'false'}>Draft</MenuItemOption>
        </MenuOptionGroup>
      )}
    </Stack>
  )
}
