import { FC, useState } from 'react'

import {
  Box,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Grid,
  HStack,
  IconButton,
  Skeleton,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import { useSearchModel } from '@wsvvrijheid/services'
import { Art, Category, StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { MdMenuOpen } from 'react-icons/md'

import {
  AnimatedBox,
  ArtCard,
  ArtCardSkeleton,
  ArtSideBar,
  CategoryFilterSkeleton,
  Container,
  CreateArtForm,
  MasonryGrid,
  Pagination,
  SearchForm,
} from '../../components'
import { useChangeParams } from '../../hooks'

export const ArtClubTemplate: FC = () => {
  const {
    query: { categories, page, searchTerm },
    locale,
  } = useRouter()

  const changeParam = useChangeParams()
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { t } = useTranslation()

  const categoryQuery = useSearchModel<Category>({
    url: 'api/categories',
    pageSize: 100,
  })

  // As mentioned in `getStaticProps`, we need to keep the same order for queryKey
  // queryKey = [arts, locale, searchTerm, category, page]
  const queryKey = ['arts', locale, searchTerm, categories || null, page || '1']

  // Custom useQuery hook or fetching arts
  const artsQuery = useSearchModel<Art>({
    url: 'api/arts',
    categories: categories as string,
    page: parseInt(page as string) || 1,
    searchTerm: searchTerm as string,
    locale: locale as StrapiLocale,
    statuses: ['approved'],
  })

  return (
    <>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody py={8}>
            <ArtSideBar
              categoryList={categoryQuery.data?.data || []}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Container minH="inherit">
        <Grid
          w="full"
          gap={4}
          my={8}
          gridTemplateColumns={{ base: '1fr', lg: '200px 1fr' }}
        >
          <Box display={{ base: 'none', lg: 'block' }}>
            {categoryQuery.isLoading ? (
              <Stack
                direction={{ base: 'row', lg: 'column' }}
                justify="stretch"
                align="center"
                w="full"
                overflowX={{ base: 'auto', lg: 'hidden' }}
                spacing={4}
              >
                <Skeleton h={8} w="full" rounded="md" />
                {Array.from({ length: 5 }).map((_, i) => (
                  <CategoryFilterSkeleton
                    key={'category-filter-skeleton' + i}
                  />
                ))}
              </Stack>
            ) : (
              <ArtSideBar
                categoryList={categoryQuery.data?.data || []}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            )}
          </Box>

          <Stack w="full" spacing={4}>
            <HStack>
              <SearchForm
                placeholder={t('search') as string}
                onSearch={value => changeParam({ searchTerm: value as string })}
                isFetching={artsQuery.isFetching}
              />
              <CreateArtForm />
              <IconButton
                display={{ base: 'flex', lg: 'none' }}
                variant="outline"
                size="lg"
                aria-label="open-menu"
                icon={<MdMenuOpen />}
                onClick={onOpen}
              />
            </HStack>

            <MasonryGrid gap={1}>
              {artsQuery.isLoading
                ? Array.from({ length: 12 }).map((_, i) => (
                    <ArtCardSkeleton
                      key={'masonry-grid-skeleton' + i}
                      isMasonry
                    />
                  ))
                : artsQuery.data?.data?.map((art, i) => {
                    return (
                      <AnimatedBox
                        key={art.id}
                        directing="to-down"
                        delay={i * 0.5}
                      >
                        <ArtCard art={art} queryKey={queryKey} isMasonry />
                      </AnimatedBox>
                    )
                  })}
            </MasonryGrid>

            {!artsQuery.isLoading && (
              <Center>
                {artsQuery.data?.meta?.pagination && (
                  <Pagination
                    totalCount={artsQuery.data.meta.pagination?.pageCount}
                    currentPage={artsQuery.data.meta.pagination?.page}
                    onPageChange={page =>
                      changeParam({ page: page.toString() })
                    }
                  />
                )}
              </Center>
            )}
          </Stack>
        </Grid>
      </Container>
    </>
  )
}
