import { FC } from 'react'

import { Box, Grid, Stack } from '@chakra-ui/react'
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useReCaptcha } from 'next-recaptcha-v3'

import { useArtBySlug, useLikeArt } from '@wsvvrijheid/services'
import { Art, StrapiLocale } from '@wsvvrijheid/types'
import { toastMessage } from '@wsvvrijheid/utils'

import {
  ArtContent,
  ArtDetail,
  CommentForm,
  CommentList,
} from '../../components'
import { CommentFormFieldValues } from '../CommentForm/types'
export type ArtWithDetailsProps = {
  art: Art
  queryKey?: QueryKey
}

export const ArtWithDetails: FC<ArtWithDetailsProps> = ({ art, queryKey }) => {
  const { executeRecaptcha } = useReCaptcha()

  const { toggleLike, isLiked, isLoading } = useLikeArt(art, queryKey)
  const queryClient = useQueryClient()

  const router = useRouter()
  const locale = router.locale as StrapiLocale

  const artCommentMutation = useMutation({
    mutationKey: ['art-comment'],
    mutationFn: (body: {
      name?: string
      content: string
      email?: string
      art: number
      recaptchaToken?: string
    }) => axios.post('/api/comments', body),
  })
  const { data } = useArtBySlug(art.slug)

  if (!art.comments) {
    art = data as Art
  }

  const handleSendForm = async ({
    name,
    content,
    email,
  }: CommentFormFieldValues) => {
    if (!art?.id) return

    try {
      const recaptchaToken = await executeRecaptcha('comment').catch(error => {
        console.error(error)

        return undefined
      })

      const body = {
        name,
        content,
        email,
        art: art.id,
        recaptchaToken,
      }

      artCommentMutation.mutate(body, {
        onSuccess: async comment => {
          await queryClient.invalidateQueries(queryKey)
          toastMessage(
            'Success',
            'Your comment has been sent successfully.',
            'success',
          )
        },
        onError: error => {
          console.error('Mutation error', error)

          toastMessage(
            'Error',
            "Couldn't send comment. Please try again later.",
            'error',
          )
        },
      })
    } catch (error) {
      console.error(error)

      toastMessage(
        'Error',
        "Couldn't send comment. Please try again later.",
        'error',
      )
    }
  }

  if (!art) return null

  const titleKey = `title_${locale}` as const
  const descriptionKey = `description_${locale}` as const

  return (
    <Grid
      pos="relative"
      gridTemplateColumns={{ base: '1fr', lg: '3fr 2fr' }}
      gap={4}
      alignItems="start"
    >
      {/* Single Art Images */}
      <Box pos={{ lg: 'sticky' }} top={0}>
        <ArtDetail
          art={art}
          isLiked={!!isLiked}
          isLoading={isLoading}
          toggleLike={toggleLike}
        />
      </Box>

      <Stack spacing={4}>
        {/* Single Art Content */}
        <ArtContent
          title={art[titleKey]}
          artistName={
            art.artist?.name || art.artist?.username || 'Unknown Artist Name'
          }
          artistAvatar={art.artist?.avatar?.url}
          description={art[descriptionKey]}
          artistProfilePath={`/club/artist/${art.artist?.id}`}
        />
        {/* Single Art Comments */}
        <Stack spacing={4}>
          {/*  Comment form */}
          <CommentForm
            isLoading={artCommentMutation.isLoading}
            onSendForm={handleSendForm}
            isSuccess={artCommentMutation.isSuccess}
          />

          {/* List comments of the current art */}
          {/* TODO Add CommentSkeleton */}
          <CommentList comments={art.comments || []} />
        </Stack>
      </Stack>
    </Grid>
  )
}
