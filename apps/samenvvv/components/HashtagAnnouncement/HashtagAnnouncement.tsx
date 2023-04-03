import { FC } from 'react'

import { Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { SITE_URL } from '@wsvvrijheid/config'
import { StrapiLocale } from '@wsvvrijheid/types'
import { Caps, Navigate, ShareButtons, useItemLink } from '@wsvvrijheid/ui'
import { mapHashtagToOgParams } from '@wsvvrijheid/utils'

import { HashtagAnnouncementProps } from './types'

export const HashtagAnnouncement: FC<HashtagAnnouncementProps> = ({
  hashtag,
  link,
}) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const linkCaps = useItemLink(hashtag, 'hashtag')

  if (!hashtag) {
    return
  }
  const capsParams = mapHashtagToOgParams(hashtag, locale as StrapiLocale)

  return (
    <SimpleGrid gap={8}>
      <Caps
        rounded={'lg'}
        overflow={'hidden'}
        w={'full'}
        shadow={'md'}
        imageParams={capsParams}
      />
      <Stack fontSize={'lg'} justify={'center'} spacing={6}>
        <Heading as={'h3'}>{hashtag.title}</Heading>
        <Text>{t('support.hashtag')}</Text>
        <Navigate href={link} fontWeight={'bold'} color={'primary.500'}>
          {t('join-link')}
        </Navigate>
        <ShareButtons
          size={'lg'}
          title={capsParams.title}
          url={`${SITE_URL}${linkCaps}`}
          quote={`${capsParams.text}\n\n ${t('support.hashtag')}\n\n`}
        />
      </Stack>
    </SimpleGrid>
  )
}
