import { FC } from 'react'

import { Box } from '@chakra-ui/layout'
import { Stack } from '@chakra-ui/react'
import { Category, Collection, StrapiLocale } from '@wsvvrijheid/types'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { CategoryFilter } from '../CategoryFilter'
import { CollectionList } from '../CollectionList'

export type ArtSideBarProps = {
  categoryData: Partial<Category>[]
  collectionData: Partial<Collection>[]
  isLoading: boolean
  debounce?: number
  initialCategories?: string[]
  setSelectedCategories: (categories: string[]) => void
  setIsLoading: (isLoading: boolean) => void
}

export const ArtSideBar: FC<ArtSideBarProps> = ({
  categoryData,
  collectionData,
  initialCategories,
  debounce,
  isLoading,
  setIsLoading,
  setSelectedCategories,
}) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <Stack spacing={8} alignSelf="start">
      {categoryData && (
        <Box maxH="calc((100vh - 150px) / 2)" overflowY="scroll">
          <CategoryFilter
            categoryData={categoryData}
            initialCategories={initialCategories}
            isLoading={isLoading}
            selectCategories={setSelectedCategories}
            setIsLoading={setIsLoading}
            title={t('categories')}
            locale={locale as StrapiLocale}
            debounce={debounce}
          />
        </Box>
      )}

      {collectionData?.length > 0 && (
        <Box overflowY="auto" maxH="calc((100vh - 150px) / 2)">
          <CollectionList collectionData={collectionData}></CollectionList>
        </Box>
      )}
    </Stack>
  )
}
