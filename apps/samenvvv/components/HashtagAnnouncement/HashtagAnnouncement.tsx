import { FC } from 'react'

import { Link, Stack, Text, VStack } from '@chakra-ui/react'
import { SITE_URL } from '@wsvvrijheid/config'
import { StrapiLocale } from '@wsvvrijheid/types'
import { Caps, ShareButtons, useItemLink } from '@wsvvrijheid/ui'
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

  const capsParams = mapHashtagToOgParams(hashtag, locale as StrapiLocale)

  return (
    <Stack spacing={4} mb={8} mt={8} ml={8}>
      <Caps imageParams={capsParams} />
      <VStack alignItems={'start'} p={4}>
        <Text>{hashtag?.content}</Text>
        <Link href={link}>
          <Text fontWeight={'bold'} color={'primary'} m={4}>
            {t('join-link')}
          </Text>
        </Link>
        <ShareButtons
          title={capsParams.title}
          url={`${SITE_URL}${linkCaps}`}
          quote={`${capsParams.text}\n\n ${t('support.hashtag')}\n\n`}
        />
      </VStack>
    </Stack>
  )
}
