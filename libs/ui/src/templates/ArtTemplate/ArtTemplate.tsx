import { FC } from 'react'

import { Box, Grid, Heading, Stack, useBreakpointValue } from '@chakra-ui/react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { QueryKey, useQueryClient } from '@tanstack/react-query'
import { Auth } from '@wsvvrijheid/types'
import {
  useArtBySlug,
  useArtCommentMutation,
  useArtsByCategories,
  useLikeArt,
  useViewArtMutation,
} from '@wsvvrijheid/utils'
import { useTranslation } from 'react-i18next'

import {
  ArtContent,
  ArtDetail,
  CommentForm,
  CommentList,
  Container,
  ArtCardBase,
} from '../../components'
import { CommentFormFieldValues } from '../../components/CommentForm/types'

export type ArtTemplateProps = {
  auth: Auth
  queryKey: QueryKey
}

export const ArtTemplate: FC<ArtTemplateProps> = ({ auth, queryKey }) => {
  const { t } = useTranslation()
  const perPage = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 })
  const { data: art } = useArtBySlug()
  const queryClient = useQueryClient()

  useViewArtMutation()

  const { toggleLike, isLiked, isLoading } = useLikeArt(
    art,
    auth?.user,
    queryKey,
  )

  const categories = (art?.categories?.flatMap(c => c.code) || []) as string[]
  const { data: arts } = useArtsByCategories(categories, art?.id)

  const artCommentMutation = useArtCommentMutation()

  const handleSendForm = ({ name, content, email }: CommentFormFieldValues) => {
    if (art?.id) {
      return artCommentMutation.mutate(
        { name, content, email, userId: auth?.user.id, id: art.id },
        {
          onSuccess: async comment => {
            queryClient.invalidateQueries(queryKey)
          },
        },
      )
    }
  }

  if (!art) return null

  return (
    <Container minH="inherit" my={8}>
      {/* TODO Create skeleton components for ArtDetail ArtContent and Comments */}

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
              art.artist?.name ||
              art.artist?.user?.username ||
              'Unknown Artist Name'
            }
            artistAvatar={art.artist?.user?.avatar?.url}
            content={art.content}
            artistProfilePath={`/artist/${art.artist?.user?.username}`}
          />
          {/* Single Art Comments */}
          <Stack spacing={4}>
            {/*  Comment form */}
            <CommentForm
              auth={auth}
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

      {/* Other Arts List */}
      {arts && arts?.length > 0 && (
        <Stack justify="space-between" w="full" mt={8} spacing={8}>
          <Heading as="h3" size="lg">
            {t('art.others')}
          </Heading>
          {/* TODO Add ArtCardSkeleton for loading state. */}
          <Splide
            options={{
              perPage,
              gap: '1rem',
            }}
          >
            {arts.map(art => (
              <SplideSlide key={art.id}>
                <ArtCardBase art={art} isLiked={false} isOwner={false} />
              </SplideSlide>
            ))}
          </Splide>
        </Stack>
      )}
    </Container>
  )
}
