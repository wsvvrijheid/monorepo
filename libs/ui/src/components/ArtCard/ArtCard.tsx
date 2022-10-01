import { FC } from 'react'

import { useAuthSelector, useLikeArt } from '@wsvvrijheid/utils'

import { ArtCardBase, ArtCardProps } from '../'

export const ArtCard: FC<ArtCardProps> = ({
  art,
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
      isMasonry
      isModal
      actionQueryKey={actionQueryKey}
    />
  )
}
