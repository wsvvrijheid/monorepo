import React, { FC } from 'react'

import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Stack,
} from '@chakra-ui/react'
import { Hashtag, StrapiLocale } from '@wsvvrijheid/types'
import { Card } from '@wsvvrijheid/ui'
import { getItemLink } from '@wsvvrijheid/utils'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

type HashtagsDrawerProps = {
  isOpen: boolean
  onClose: () => void
  hashtags: Hashtag[]
}

export const HashtagsDrawer: FC<HashtagsDrawerProps> = ({
  isOpen,
  onClose,
  hashtags,
}) => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{t`post.all-hashtags`}</DrawerHeader>

        <DrawerBody>
          <Stack spacing={4}>
            {hashtags?.map(hashtag => {
              const link = getItemLink(
                hashtag,
                locale as StrapiLocale,
                'hashtag',
              ) as string

              return (
                <Card
                  key={hashtag.id}
                  title={hashtag.title}
                  image={hashtag.image?.url}
                  description={hashtag.description}
                  link={link}
                />
              )
            })}
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
