import { FC } from 'react'

import { Heading, Stack, useBreakpointValue } from '@chakra-ui/react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { QueryKey } from '@tanstack/react-query'
import {
  useArtBySlug,
  useArtsByCategories,
  useViewArtMutation,
} from '@wsvvrijheid/services'
import { useTranslation } from 'next-i18next'

import { Container, ArtCardBase, ArtWithDetails } from '../../components'

export type ArtTemplateProps = {
  queryKey: QueryKey
}

export const ArtTemplate: FC<ArtTemplateProps> = ({ queryKey }) => {
  const { t } = useTranslation()
  const perPage = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 })
  const { data: art } = useArtBySlug()

  useViewArtMutation()

  const categories = (art?.categories?.flatMap(
    (c: { slug: string }) => c.slug,
  ) || []) as string[]
  const { data: arts } = useArtsByCategories(categories, art?.id)

  if (!art) return null

  return (
    <Container minH="inherit" my={8}>
      {/* TODO Create skeleton components for ArtDetail ArtContent and Comments */}

      <ArtWithDetails art={art} queryKey={queryKey} />

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
