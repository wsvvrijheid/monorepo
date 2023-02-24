import { FC, memo } from 'react'

import { Image } from '@chakra-ui/react'
import { OgImageParams } from '@wsvvrijheid/types'
import { getOgImageSrc } from '@wsvvrijheid/utils'

export const OgImage: FC<OgImageParams> = memo(props => {
  const src = getOgImageSrc(props)

  return <Image w="full" src={src} alt={props.title} />
})
