import { forwardRef, Fragment } from 'react'

import { Heading, Stack, Text, VStack } from '@chakra-ui/react'
import { StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

import { Page } from './Page'
import { CollectionPagesPops } from './types'
import { WImage } from '../WImage'

export const CollectionPages = forwardRef<HTMLDivElement, CollectionPagesPops>(
  function CollectionPages({ collection, pageBgGdarient }, ref) {
    const router = useRouter()
    const locale = router.locale as StrapiLocale

    const titleKey = `title_${locale}` as const
    const descriptionKey = `description_${locale}` as const

    if (!collection.arts) return null

    return (
      <>
        {collection.arts.map((art, index) => (
          <Fragment key={index}>
            <Page ref={ref} p={8} bgGradient={pageBgGdarient}>
              <VStack justify="center" w="full" h="full" spacing={2}>
                <Heading color="red.500" fontFamily="club" textAlign="center">
                  {art[titleKey]}
                </Heading>

                {art.image && (
                  <WImage
                    rounded="sm"
                    maxH="80%"
                    src={art.image}
                    alt={art[titleKey]}
                  />
                )}

                <Text fontFamily="club">{art[descriptionKey]}</Text>
              </VStack>
            </Page>
            <Page ref={ref} bgGradient={pageBgGdarient}>
              <Stack w="full" h="full" justify="center" fontFamily="club">
                <Text fontFamily="club" textAlign="right">
                  {art.artist?.name}
                </Text>
              </Stack>
              <Text fontFamily="club" pos="absolute" bottom={4} right={6}>
                {index + 1}
              </Text>
            </Page>
          </Fragment>
        ))}
      </>
    )
  },
)
