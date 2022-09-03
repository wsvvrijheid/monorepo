import { FC } from 'react'

import { useLikeArt } from '@wsvvrijheid/utils'

import { ArtCardBase, ArtCardProps } from '../'

export const ArtCard: FC<ArtCardProps> = ({ art, user, queryKey }) => {
  const { toggleLike, isLiked } = useLikeArt(art, user, queryKey)

  return (
    <ArtCardBase
      art={art}
      isLiked={isLiked as boolean}
      toggleLike={toggleLike}
      isOwner={user?.id === art.artist?.user?.id}
      isMasonry
    />
  )
}
