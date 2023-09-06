import React, { FC } from 'react'

import { Divider, HStack, Radio, RadioGroup, Stack } from '@chakra-ui/react'

import { ApprovalStatus } from '@wsvvrijheid/types'

type ModelFiltersBarProps = {
  status: ApprovalStatus | 'all'
  setStatus: (status: ApprovalStatus) => void
  published: string
  setPublished: (published: string) => void
  showApprovalStatus?: boolean
  showPublicationState?: boolean
}

export const ModelFiltersBar: FC<ModelFiltersBarProps> = ({
  status,
  setStatus,
  published,
  setPublished,
  showApprovalStatus,
  showPublicationState,
}) => {
  if (!showApprovalStatus && !showPublicationState) return null

  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      p={2}
      bg={'white'}
      rounded={'sm'}
      shadow={'sm'}
      overflowX={'auto'}
      flexShrink={0}
    >
      {showApprovalStatus && (
        <RadioGroup
          as={HStack}
          spacing={4}
          colorScheme={'primary'}
          value={status || 'all'}
          onChange={val => setStatus(val as ApprovalStatus)}
        >
          <Radio value={'all'}>All</Radio>
          <Radio value={'approved'}>Approved</Radio>
          <Radio value={'pending'}>Pending</Radio>
          <Radio value={'rejected'}>Rejected</Radio>
        </RadioGroup>
      )}

      {showApprovalStatus && showPublicationState && (
        <>
          <Divider
            display={{ base: 'none', lg: 'block' }}
            mx={8}
            orientation="vertical"
          />
          <Divider display={{ base: 'block', lg: 'none' }} />
        </>
      )}

      {showPublicationState && (
        <RadioGroup
          colorScheme={'primary'}
          as={HStack}
          spacing={4}
          value={published || 'true'}
          onChange={val => setPublished(val)}
        >
          <Radio value={'all'}>All</Radio>
          <Radio value={'true'}>Live</Radio>
          <Radio value={'false'}>Draft</Radio>
        </RadioGroup>
      )}
    </Stack>
  )
}
