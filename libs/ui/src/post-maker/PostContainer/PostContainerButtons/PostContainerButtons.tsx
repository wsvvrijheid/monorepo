import { useCallback } from 'react'

import { Button, SimpleGrid } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { setRandomPost, useCurrentPost } from '@wsvvrijheid/services'
import {
  addSharedPost,
  togglePostModal,
  useAppDispatch,
  useAppSelector,
} from '@wsvvrijheid/store'
import { Post, StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { TwitterShareButton } from 'next-share'
import { FaAt, FaRandom, FaTwitter } from 'react-icons/fa'

import { useItemLink } from '../../../hooks'

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

  const postUrlAbsolute = useItemLink(post as Post, 'post', true)

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
        colorScheme="primary"
        onClick={shufflePost}
        rightIcon={<FaRandom />}
      >
        {t('post.next-tweet')}
      </Button>
      <TwitterShareButton title={postContent} url={postUrlAbsolute as string}>
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
      </TwitterShareButton>
    </SimpleGrid>
  )
}
