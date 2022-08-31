import { Box, Skeleton } from '@chakra-ui/react'

export const ArtCardSkeleton = ({ isMasonry }: { isMasonry: boolean }) => {
  const height = isMasonry
    ? Math.floor(Math.random() * (400 - 200 + 1)) + 200
    : '300px'

  return (
    <Box w="full" pos="relative">
      <Skeleton h={height} />
    </Box>
  )
}
