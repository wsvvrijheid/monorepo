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
}) => {
  const { toggleLike, isLiked } = useLikeArt()
  const { user } = useAuthContext()

  const handleToggleLike = () => {
    toggleLike()
    onToggleLike?.()
  }

  return (
    <ArtCardBase
      art={art}
      isLiked={isLiked as boolean}
      toggleLike={handleToggleLike}
      isOwner={user?.id === art.artist?.id}
      isMasonry={isMasonry}
      isModal={isModal}
    />
  )
}
