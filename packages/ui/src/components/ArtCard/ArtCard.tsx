import { FC } from 'react'

import { useAuthContext } from '@fc/context'
import { useLikeArt } from '@fc/services'

import { ArtCardBase } from './ArtCardBase'
import { ArtCardProps } from './types'

export const ArtCard: FC<ArtCardProps> = ({
  art,
  isMasonry,
  isModal,
  onToggleLike,
  recaptchaToken,
}) => {
  const { toggleLike, isLiked } = useLikeArt({
    art,
    recaptchaToken,
    onToggleLike,
  })
  const { user } = useAuthContext()

  return (
    <ArtCardBase
      art={art}
      isLiked={isLiked as boolean}
      toggleLike={toggleLike}
      isOwner={user?.id === art.artist?.id}
      isMasonry={isMasonry}
      isModal={isModal}
    />
  )
}
