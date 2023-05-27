import { FC } from 'react'

import { useAuthContext } from '@wsvvrijheid/context'
import { useLikeArt } from '@wsvvrijheid/services'

import { ArtCardBase } from './ArtCardBase'
import { ArtCardProps } from './types'

export const ArtCard: FC<ArtCardProps> = ({
  art,
  isMasonry,
  queryKey,
  actionQueryKey,
  isModal,
}) => {
  const { toggleLike, isLiked } = useLikeArt(art, queryKey)
  const { user } = useAuthContext()

  return (
    <ArtCardBase
      art={art}
      isLiked={isLiked as boolean}
      toggleLike={toggleLike}
      isOwner={user?.id === art.artist?.id}
      isMasonry={isMasonry}
      isModal={isModal}
      actionQueryKey={actionQueryKey}
    />
  )
}
