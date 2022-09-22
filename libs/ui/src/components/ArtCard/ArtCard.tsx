import { FC } from 'react'

import { useLikeArt } from '@wsvvrijheid/utils'

import { ArtCardBase, ArtCardProps } from '../'

export const ArtCard: FC<ArtCardProps> = ({
  art,
  auth,
  queryKey,
  actionQueryKey,
}) => {
  const { toggleLike, isLiked } = useLikeArt(art, auth.user, queryKey)

  return (
    <ArtCardBase
      auth={auth}
      art={art}
      isLiked={isLiked as boolean}
      toggleLike={toggleLike}
      isOwner={auth.user?.id === art.artist?.id}
      isMasonry
      isModal
      actionQueryKey={actionQueryKey}
    />
  )
}
