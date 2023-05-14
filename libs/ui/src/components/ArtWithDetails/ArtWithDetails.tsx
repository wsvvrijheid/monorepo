import { FC } from 'react'

import { Stack, Box, Grid } from '@chakra-ui/react'
import { QueryKey, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useReCaptcha } from 'next-recaptcha-v3'

import { NX_RECAPTCHA_SECRET_KEY } from '@wsvvrijheid/secrets'
import {
  useArtBySlug,
  useArtCommentMutation,
  useLikeArt,
} from '@wsvvrijheid/services'
import { useAuthSelector } from '@wsvvrijheid/store'
import { Art, StrapiLocale } from '@wsvvrijheid/types'

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

  const auth = useAuthSelector()

  const artCommentMutation = useArtCommentMutation()
  const { data } = useArtBySlug(art.slug)

  if (!art.comments) {
    art = data as Art
  }

  const handleSendForm = async ({
    name,
    content,
    email,
  }: CommentFormFieldValues) => {
    if (art?.id) {
      const recaptchaToken = await executeRecaptcha('comment')
      // console.log(recaptchaToken)

      fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        mode: 'no-cors',
        body: `secret=${NX_RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))

      const body = {
        name: name as string,
        content,
        email: email as string,
        user: auth?.user?.id,
        art: art.id,
      }

      return artCommentMutation.mutate(body, {
        onSuccess: async comment => {
          queryClient.invalidateQueries(queryKey)
        },
      })
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
