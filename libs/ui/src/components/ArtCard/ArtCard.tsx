import { FC } from 'react'

import { useLikeArt } from '@wsvvrijheid/services'
import { useAuthSelector } from '@wsvvrijheid/store'

import { ArtCardBase } from './ArtCardBase'
import { ArtCardProps } from './types'

export const ArtCard: FC<ArtCardProps> = ({
  art,
  isMasonry,
  queryKey,
  actionQueryKey,
}) => {
  const { toggleLike, isLiked } = useLikeArt(art, queryKey)
  const { user } = useAuthSelector()

  return (
    <ArtCardBase
      art={art}
      isLiked={isLiked as boolean}
      toggleLike={toggleLike}
      isOwner={user?.id === art.artist?.id}
      isMasonry={isMasonry}
      isModal
      actionQueryKey={actionQueryKey}
    />
  )
}
