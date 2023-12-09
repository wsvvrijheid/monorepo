import { FC } from 'react'

import { useAuthContext } from '@wsvvrijheid/context'
import { useLikeArt } from '@wsvvrijheid/services'

import { ArtCardBase } from './ArtCardBase'
import { ArtCardProps } from './types'

export const ArtCard: FC<ArtCardProps> = ({
  art,
  isMasonry,
  isModal,
  onToggleLike,
}) => {
  const { toggleLike, isLiked } = useLikeArt(art)
  const { user } = useAuthContext()

  const handeToggleLike = () => {
    toggleLike()
    onToggleLike?.()
  }

  return (
    <ArtCardBase
      art={art}
      isLiked={isLiked as boolean}
      toggleLike={handeToggleLike}
      isOwner={user?.id === art.artist?.id}
      isMasonry={isMasonry}
      isModal={isModal}
    />
  )
}
