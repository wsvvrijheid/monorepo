import { FC } from 'react'

import { Stack, Text, VStack } from '@chakra-ui/react'
import { SITE_URL } from '@wsvvrijheid/config'
import { StrapiLocale } from '@wsvvrijheid/types'
import { Caps, Navigate, ShareButtons, useItemLink } from '@wsvvrijheid/ui'
import { mapHashtagToOgParams } from '@wsvvrijheid/utils'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { HashtagAnnouncementProps } from './types'

export const HashtagAnnouncement: FC<HashtagAnnouncementProps> = ({
  hashtag,
  link,
}) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const linkCaps = useItemLink(hashtag, 'hashtag')
  console.log('hashtag >>', hashtag)
  if (!hashtag) {
    return
  }
  const capsParams = mapHashtagToOgParams(hashtag, locale as StrapiLocale)

  return (
    <Stack spacing={4} mb={8} mt={8} ml={8}>
      <Caps imageParams={capsParams} />
      <VStack alignItems={'start'} p={4}>
        <Text>{t('support.hashtag')}</Text>
        <Navigate href={link}>
          <Text fontWeight={'bold'} color={'primary'} m={4}>
            {t('join-link')}
          </Text>
        </Navigate>
        <ShareButtons
          title={capsParams.title}
          url={`${SITE_URL}${linkCaps}`}
          quote={`${capsParams.text}\n\n ${t('support.hashtag')}\n\n`}
        />
      </VStack>
    </Stack>
  )
}
