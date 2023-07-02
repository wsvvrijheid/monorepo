import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Art } from '@wsvvrijheid/types'

import { WImage } from '../../components'

export type CardBaseProps = { art: Art; onClick?: () => void }

export const CardBase: FC<CardBaseProps> = ({ art, onClick }) => {
  const router = useRouter()

  const titleKey = `title_${router.locale}` as const

  return (
    <Box shadow="base" onClick={onClick} borderRadius="lg" overflow="hidden">
      {art.image && <WImage height="200px" src={art.image} alt="" />}

      <Box px="4" py="2">
        <Box>{art[titleKey]}</Box>

        <Box>{art.artist?.name || art.artist?.username}</Box>
      </Box>
    </Box>
  )
}
