import { useCallback } from 'react'

import { Button, Link, SimpleGrid } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaAt, FaRandom, FaTwitter } from 'react-icons/fa'

import { SITE_URL } from '@wsvvrijheid/config'
import { setRandomPost, useCurrentPost } from '@wsvvrijheid/services'
import {
  addSharedPost,
  togglePostModal,
  useAppDispatch,
  useAppSelector,
} from '@wsvvrijheid/store'
import { StrapiLocale } from '@wsvvrijheid/types'

export const PostContainerButtons = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const { postContent } = useAppSelector(state => state.post)

  const {
    locale,
    query: { slug },
  } = useRouter()

  const post = useCurrentPost()

  const dispatch = useAppDispatch()
  const { isExceeded } = useAppSelector(state => state.post)

  const baseUrl = 'https://twitter.com/intent/tweet'
  const params = {
    url: `${SITE_URL}/${locale}/hashtags/${post?.hashtag?.slug}/${post?.id}`,
    text: `${postContent}\n\n`,
  }
  const query = new URLSearchParams(params)
  const result = query.toString()

  const postUrl = `${baseUrl}?${result.toString()}`

  const shufflePost = useCallback(
    () => setRandomPost(queryClient, locale as StrapiLocale, slug as string),
    [queryClient, locale, slug],
  )

  const onAddShare = () => {
    post?.id && dispatch(addSharedPost(post.id))
  }

  return (
    <SimpleGrid
      columns={{ base: 1, xl: 2 }}
      spacing={2}
      mt="auto"
      flex={1}
      alignContent="end"
    >
      <Button
        data-tour-mob="step-mention-button"
        display={{ base: 'flex', lg: 'none' }}
        w="full"
        rounded="full"
        colorScheme="purple"
        onClick={() => dispatch(togglePostModal())}
        rightIcon={<FaAt />}
      >
        {t('post.add-mention')}
      </Button>
      <Button
        data-tour-mob="step-next-button"
        data-tour="step-next-button"
        w="full"
        rounded="full"
        onClick={shufflePost}
        rightIcon={<FaRandom />}
      >
        {t('post.next-tweet')}
      </Button>
      <Link href={postUrl} isExternal>
        <Button
          data-tour="step-share-button"
          data-tour-mob="step-share-button"
          as="span"
          w="full"
          rounded="full"
          colorScheme="twitter"
          rightIcon={<FaTwitter />}
          isDisabled={isExceeded}
          disabled={isExceeded}
          onClick={onAddShare}
        >
          {t('post.share-tweet')}
        </Button>
      </Link>
    </SimpleGrid>
  )
}
