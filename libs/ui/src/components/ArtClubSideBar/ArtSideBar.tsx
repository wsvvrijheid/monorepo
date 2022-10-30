import { FC } from 'react'

import { Box } from '@chakra-ui/layout'
import { Stack } from '@chakra-ui/react'
import { useCollections } from '@wsvvrijheid/services'
import { Category, StrapiLocale } from '@wsvvrijheid/types'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { useChangeParams } from '../../hooks'
import { CategoryFilter } from '../CategoryFilter'
import { CollectionList } from '../CollectionList'

export type ArtSideBarProps = {
  categoryList: Category[]
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export const ArtSideBar: FC<ArtSideBarProps> = ({
  categoryList,
  isLoading,
  setIsLoading,
}) => {
  const { t } = useTranslation()
  const changeParam = useChangeParams()
  const {
    locale,
    query: { categories },
  } = useRouter()

  const collectionsQuery = useCollections()

  const initialCategories = (categories as string)
    ?.split('&')
    .map(category => category.split('=')[1])

  return (
    <Stack spacing={8} alignSelf="start">
      {categoryList && (
        <Box maxH="calc((100vh - 150px) / 2)" overflowY="scroll">
          <CategoryFilter
            categoryData={categoryList || []}
            initialCategories={initialCategories}
            isLoading={isLoading}
            selectCategories={value => changeParam({ categories: value })}
            setIsLoading={setIsLoading}
            title={t('categories')}
            locale={locale as StrapiLocale}
          />
        </Box>
      )}

      {collectionsQuery?.data && collectionsQuery?.data?.length > 0 && (
        <Box overflowY="auto" maxH="calc((100vh - 150px) / 2)">
          <CollectionList
            collectionData={collectionsQuery.data || []}
          ></CollectionList>
        </Box>
      )}
    </Stack>
  )
}
