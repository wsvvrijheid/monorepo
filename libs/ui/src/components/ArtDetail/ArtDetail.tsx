import { FC } from 'react'

import { Box, Button, HStack, Text } from '@chakra-ui/react'
import { SITE_URL } from '@wsvvrijheid/config'
import { Art, StrapiLocale } from '@wsvvrijheid/types'
import router, { useRouter } from 'next/router'
import { AiFillHeart } from 'react-icons/ai'
import { FaEye } from 'react-icons/fa'

import { ShareButtons } from '../ShareButtons'
import { WImage } from '../WImage'

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
  const url = `${SITE_URL}/${locale}/club/arts/${art.slug}`

  if (!art?.image) return null

  return (
    <Box bg="white" padding={4} boxShadow="base">
      <WImage
        maxH={500}
        src={art.image}
        alt={art?.[`title_${router.locale as StrapiLocale}`]}
        hasZoom
      />

      <HStack bg="white" justify="center" mt={4}>
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
        <ShareButtons
          title={art?.[`title_${locale as StrapiLocale}`]}
          url={url}
          quote={art?.[`description_${locale as StrapiLocale}`] || ''}
        />
      </HStack>
    </Box>
  )
}
