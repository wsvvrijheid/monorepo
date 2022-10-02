import { FC } from 'react'

import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import { Stack, Box, Grid } from '@chakra-ui/react'
import { QueryKey, useQueryClient } from '@tanstack/react-query'
import { Art } from '@wsvvrijheid/types'
import {
  useArtBySlug,
  useArtCommentMutation,
  useAuthSelector,
  useLikeArt,
} from '@wsvvrijheid/utils'

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
  const { toggleLike, isLiked, isLoading } = useLikeArt(art, queryKey)
  const queryClient = useQueryClient()

  const auth = useAuthSelector()

  const artCommentMutation = useArtCommentMutation()
  const { data } = useArtBySlug(art.slug)

  if (!art.comments) {
    art = data as Art
  }

  const handleSendForm = ({ name, content, email }: CommentFormFieldValues) => {
    if (art?.id) {
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
          title={art.title}
          artistName={
            art.artist?.name || art.artist?.username || 'Unknown Artist Name'
          }
          artistAvatar={art.artist?.avatar?.url}
          content={art.content as string}
          artistProfilePath={`/artist/${art.artist?.username}`}
        />
        {/* Single Art Comments */}
        <Stack spacing={4}>
          {/*  Comment form */}
          <CommentForm
            isLoading={artCommentMutation.isLoading}
            onSendForm={handleSendForm}
            isSuccess={artCommentMutation.isSuccess}
          />

          {/*List comments of the current art */}
          {/* TODO Add CommentSkeleton */}
          <CommentList comments={art.comments || []} />
        </Stack>
      </Stack>
    </Grid>
  )
}
