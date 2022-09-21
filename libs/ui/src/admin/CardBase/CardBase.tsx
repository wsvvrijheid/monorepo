import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { Art } from '@wsvvrijheid/types'

import { WImage } from '../../components'

export type CardBaseProps = { art: Art; onClick?: () => void }

export const CardBase: FC<CardBaseProps> = ({ art, onClick }) => {
  return (
    <Box shadow="base" onClick={onClick} borderRadius="lg" overflow="hidden">
      <WImage height="200px" src={art.images![0].url} alt="" />

      <Box px="4" py="2">
        <Box>{art.title}</Box>

        <Box>{art.artist?.name || art.artist?.username}</Box>
      </Box>
    </Box>
  )
}
