import { FC } from 'react'

import { useLikeArt } from '@wsvvrijheid/utils'

import { ArtActions, ArtCardBase, ArtCardProps } from '../'

export const ArtCard: FC<ArtCardProps> = ({ art, user, queryKey }) => {
  const { toggleLike, isLiked } = useLikeArt(art, user, queryKey)

  const actions: ArtActions = {
    delete: {
      title: 'Delete',
      buttonText: 'Delete',
      colorScheme: 'red',
      text: 'Are you sure you want to delete this art?',
      onClick: () => alert('Deleted'),
    },
    publish: {
      title: 'Publish',
      buttonText: 'Publish',
      colorScheme: 'green',
      text: 'Are you sure you want to publish this art?',
      onClick: () => alert('Published'),
    },
    unpublish: {
      title: 'Unpublish',
      buttonText: 'Unpublish',
      colorScheme: 'red',
      text: 'Are you sure you want to unpublish this art?',
      onClick: () => alert('Unpublished'),
    },
  }

  return (
    <ArtCardBase
      art={art}
      isLiked={isLiked as boolean}
      toggleLike={toggleLike}
      isOwner={user?.id === art.artist?.user?.id}
      actions={actions}
      isMasonry
    />
  )
}
