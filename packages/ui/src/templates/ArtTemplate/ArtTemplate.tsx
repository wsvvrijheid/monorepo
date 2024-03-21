import { Heading, Stack, useBreakpointValue } from '@chakra-ui/react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { useTranslation } from 'next-i18next'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

import { RECAPTCHA_SITE_KEY } from '@fc/config'
import { useArtBySlug, useArtsByCategories } from '@fc/services'

import { ArtCardBase, ArtWithDetails, Container } from '../../components'

import '@splidejs/react-splide/css'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'

export const ArtTemplate = () => {
  const { t } = useTranslation()
  const perPage = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 })

  const { data: art } = useArtBySlug()

  const categories = (art?.categories?.flatMap(
    (c: { slug: string }) => c.slug,
  ) || []) as string[]

  const { data: arts } = useArtsByCategories(categories, art?.id)

  if (!art) return null

  return (
    <ReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
      <Container minH="inherit" my={8}>
        {/* TODO Create skeleton components for ArtDetail ArtContent and Comments */}
        <ArtWithDetails />

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
                  <ArtCardBase
                    art={art}
                    isLiked={art.isLiked}
                    isOwner={false}
                  />
                </SplideSlide>
              ))}
            </Splide>
          </Stack>
        )}
      </Container>
    </ReCaptchaProvider>
  )
}
