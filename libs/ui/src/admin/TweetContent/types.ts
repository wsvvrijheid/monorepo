import { Tweet } from '@wsvvrijheid/types'

import { ModelImageProps } from '../ModelForm/ModelImage'

export type TweetContentProps = Partial<
  Pick<ModelImageProps, 'isChangingImage' | 'setIsChangingImage' | 'setValue'>
> & {
  tweet: Tweet
  horizontal?: boolean
}
