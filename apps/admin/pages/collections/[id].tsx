import { FC } from 'react'

import {
  Box,
  Button,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { IoMdAdd } from 'react-icons/io'

import { useModelById } from '@wsvvrijheid/services'
import { Collection } from '@wsvvrijheid/types'
import {
  AdminLayout,
  ArtAddToCollectionGrid,
  ArtAddToCollectionModal,
  CollectionEdit,
  FormLocaleSwitcher,
  PageHeader,
  useHasPermission,
} from '@wsvvrijheid/ui'

import i18nConfig from '../../next-i18next.config'

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const CollectionPage: FC<PageProps> = ({ seo }) => {
  const { query } = useRouter()
  const { t } = useTranslation()

  const id = Number(query.id as string)
  const {
    data: collection,
    isLoading,
    refetch,
  } = useModelById<Collection>({
    url: 'api/collections',
    id,
  })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { getPermission } = useHasPermission()

  return (
    <AdminLayout seo={seo} isLoading={isLoading} hasBackButton>
      <PageHeader>
        <FormLocaleSwitcher
          models={collection?.localizations}
          slug={'collections'}
        />
      </PageHeader>
      <ArtAddToCollectionModal
        isOpen={isOpen}
        onClose={onClose}
        collection={collection}
      />
      <Stack spacing={6}>
        <Box p={6} rounded="md" bg="white" shadow="md">
          {collection && (
            <CollectionEdit collection={collection} onSuccess={refetch} />
          )}
        </Box>

        <Box p={6} rounded="md" bg="white" shadow="md">
          {collection && (
            <Stack spacing={6}>
              <HStack justify="space-between">
                <Text fontWeight={700} fontSize="xl" noOfLines={1}>
                  {t('collection-arts')}
                </Text>

                {getPermission(['arteditor']) && (
                  <Button leftIcon={<IoMdAdd />} onClick={onOpen}>
                    {t('collection.add-art')}
                  </Button>
                )}
              </HStack>
              {collection.arts && (
                <ArtAddToCollectionGrid
                  collection={collection}
                  arts={collection.arts.map(art => ({ ...art, collection }))}
                  onSuccess={refetch}
                />
              )}
            </Stack>
          )}
        </Box>
      </Stack>
    </AdminLayout>
  )
}

export const getServerSideProps = async context => {
  const { locale } = context

  const title = {
    en: 'Collection Translate',
    tr: 'Koleksiyon Çeviri',
    nl: 'Collectie Vertalen',
  }

  const seo: NextSeoProps = {
    title: title[locale],
  }

  return {
    props: {
      seo,
      ...(await serverSideTranslations(
        locale,
        ['common', 'admin'],
        i18nConfig,
      )),
    },
  }
}

export default CollectionPage
