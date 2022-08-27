import { FC, memo } from 'react'

import { Box, Button, Center, HStack, Text, VStack } from '@chakra-ui/react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { SITE_URL } from '@wsvvrijheid/config'
import { Art, UploadFile } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'
import { AiFillHeart } from 'react-icons/ai'
import { FaEye } from 'react-icons/fa'

import { ShareButtons } from '../ShareButtons'
import { WImage } from '../WImage'

interface ArtImageProps {
  image: UploadFile
  alt: string
}

const ArtImage: FC<ArtImageProps> = memo(({ image, alt }) => {
  return <WImage maxH={500} src={image} alt={alt} />
})

interface ArtDetailProps {
  art: Art
  isLiked: boolean
  isLoading: boolean
  toggleLike: (isSinglePage: boolean) => void
}

export const ArtDetail: FC<ArtDetailProps> = ({
  art,
  isLiked,
  isLoading,
  toggleLike,
}) => {
  const { locale } = useRouter()
  const url = `${SITE_URL}/${locale}/club/art/${art.slug}`

  if (!art?.images) return null

  return (
    <VStack bg="white" spacing={4} padding={4} boxShadow="base">
      {art.images && art.images.length > 1 ? (
        <Splide>
          {art?.images.map(image => (
            <Center as={SplideSlide} key={image.id}>
              <ArtImage image={image} alt={art.title} />
            </Center>
          ))}
        </Splide>
      ) : (
        <ArtImage image={art.images?.[0]} alt={art.title} />
      )}

      <HStack bg="white">
        {art.views && (
          <HStack
            py={0.5}
            px={3}
            rounded="full"
            borderColor="gray.200"
            borderWidth={1}
          >
            <Text>{art.views}</Text>
            <Box as={FaEye} />
          </HStack>
        )}
        <Button
          rounded="full"
          colorScheme={isLiked ? 'red' : 'gray'}
          rightIcon={<AiFillHeart />}
          onClick={() => toggleLike(true)}
          size="sm"
          variant="outline"
          isLoading={isLoading}
        >
          {(art?.likes || 0) + (art.likers?.length || 0)}
        </Button>
        {/* TODO when I change size of the SharedButtons as shown in Figma, 
        it will affect other SharedButtons component. Customize it to have different sizes
        or create a new component for here */}
        <ShareButtons
          title={art?.title}
          url={url}
          quote={art.description || ''}
        />
      </HStack>
    </VStack>
  )
}
