import { forwardRef, Fragment } from 'react'

import { Heading, Image, Stack, Text, VStack } from '@chakra-ui/react'
import { Collection } from '@wsvvrijheid/types'

import { Page } from './Page'
interface CollectionPagesPops {
  collection: Collection
  pageBgGdarient: string
}

export const CollectionPages = forwardRef<HTMLDivElement, CollectionPagesPops>(
  function CollectionPages({ collection, pageBgGdarient }, ref) {
    if (!collection.arts) return null

    return (
      <>
        {collection.arts.map((art, index) => (
          <Fragment key={index}>
            <Page ref={ref} p={8} bgGradient={pageBgGdarient}>
              <VStack justify="center" w="full" h="full" spacing={2}>
                <Heading color="red.500" fontFamily="club" textAlign="center">
                  {art.title}
                </Heading>

                <Image
                  rounded="sm"
                  maxH="80%"
                  src={process.env['NX_API_URL'] + art.images![0].url}
                  alt={art.title}
                />

                <Text fontFamily="club">{art.description}</Text>
              </VStack>
            </Page>
            <Page ref={ref} bgGradient={pageBgGdarient}>
              <Stack w="full" h="full" justify="center" fontFamily="club">
                <Text fontFamily="club" textAlign="center">
                  {art.content}
                </Text>
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
