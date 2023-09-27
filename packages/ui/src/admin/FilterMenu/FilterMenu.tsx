import {
  HStack,
  IconButton,
  MenuItemOption,
  MenuOptionGroup,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { GrClearOption } from 'react-icons/gr'

import { RequestCollectionArgs } from '@wsvvrijheid/lib'
import { useStrapiRequest } from '@wsvvrijheid/services'
import { StrapiCollectionEndpoint, StrapiModel } from '@wsvvrijheid/types'

import { I18nNamespaces } from '../../../@types/i18next'
import { mapModelsToOptions } from '../ModelForm'

type Props<T extends StrapiCollectionEndpoint, D extends StrapiModel> = {
  endpoint: T
  setIds: (ids: number[]) => void
  ids: number[]
  filters?: RequestCollectionArgs['filters']
}

export const FilterMenu = <
  T extends StrapiCollectionEndpoint,
  D extends StrapiModel,
>({
  endpoint,
  setIds,
  ids,
  filters = {},
}: Props<T, D>) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const modelsQuery = useStrapiRequest<D>({
    endpoint,
    populate: [],
    locale,
    filters,
  })

  return (
    <MenuOptionGroup
      zIndex={'modal'}
      pos={'relative'}
      title={
        (
          <HStack>
            <Text flex={1} noOfLines={1}>
              {t(endpoint as keyof I18nNamespaces['common'])}
            </Text>
            <IconButton
              size={'xs'}
              aria-label={t('clear')}
              icon={<GrClearOption />}
              onClick={() => setIds([])}
              isRound
              variant="outline"
              colorScheme={'gray'}
            />
          </HStack>
        ) as unknown as string
      }
      type="checkbox"
      onChange={(value: string | string[]) =>
        setIds((value as string[]).map(v => +v))
      }
      value={ids.map(id => `${id}`)}
      maxH={500}
      overflowY={'auto'}
    >
      {/* TODO: Add loading skeleton */}
      {mapModelsToOptions(modelsQuery.data?.data || [], locale)?.map(model => {
        return (
          <MenuItemOption key={model.value} value={model.value}>
            {model.label}
          </MenuItemOption>
        )
      })}
    </MenuOptionGroup>
  )
}
