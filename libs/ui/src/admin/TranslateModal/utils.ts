import { StrapiTranslatableModel } from '@wsvvrijheid/types'
import { isEmpty } from 'lodash'

import {
  DefaultTranslatableModel,
  LocalizedModel,
  TranslatableModel,
} from './types'

export const mapModelLocalization = <T extends StrapiTranslatableModel>({
  localizations,
  ...model
}: DefaultTranslatableModel<T>) => {
  const defaultLocalizedModel = {
    [model.locale]: {
      ...model,
      translationStatus: model.translationStatus || 'pending',
      image: model.images?.[0] || model.image,
    },
  } as LocalizedModel<T>

  const localizedModels = localizations?.reduce((acc, localization) => {
    return {
      ...acc,
      [localization.locale]: {
        ...localization,
        status: localization.translationStatus || 'pending',
        image:
          (localization as TranslatableModel<T>)?.images?.[0] ||
          (localization as TranslatableModel<T>)?.image,
      },
    }
  }, {} as LocalizedModel<T>)

  if (!isEmpty(localizedModels)) {
    return {
      ...defaultLocalizedModel,
      ...localizedModels,
    }
  }

  return defaultLocalizedModel
}
