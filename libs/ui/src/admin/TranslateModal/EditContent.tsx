import { FC } from 'react'

import { TranslationKey } from './types'

type EditContentProps = {
  translationKey: TranslationKey
}

export const EditContent: FC<EditContentProps> = ({ translationKey }) => {
  return <div>EditContent</div>
}
