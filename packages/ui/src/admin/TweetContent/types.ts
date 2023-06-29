import { FieldValues } from 'react-hook-form'

import { Tweet } from '@wsvvrijheid/types'

import { ModelImageProps } from '../ModelForm/ModelImage'

export type TweetContentProps<T extends FieldValues = FieldValues> = Partial<
  Pick<
    ModelImageProps<T>,
    'isChangingImage' | 'setIsChangingImage' | 'setValue'
  >
> & {
  tweet: Tweet
  horizontal?: boolean
}

export type TweetContentComponent = <T extends FieldValues = FieldValues>(
  props: TweetContentProps<T>,
) => JSX.Element
