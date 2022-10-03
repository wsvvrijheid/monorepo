import { FC } from 'react'

import { Box } from '@chakra-ui/layout'
import { Divider, HStack, Text } from '@chakra-ui/react'
import { Collection } from '@wsvvrijheid/types'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { MdCollectionsBookmark } from 'react-icons/md'

import { Navigate } from '../Navigate'

export type CollectionListProps = {
  collectionData: Partial<Collection>[]
}

export const CollectionList: FC<CollectionListProps> = ({ collectionData }) => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  return (
    <div>
      <HStack py={1.5} w="full" align="center">
        <Box as={MdCollectionsBookmark} />
        <Text
          display={{ base: 'none', lg: 'block' }}
          fontWeight="semibold"
        >{t`collections`}</Text>
      </HStack>
      <Divider />
      {collectionData.map((collection, index) => (
        <Navigate
          key={index}
          href={`/${locale}/club/collections/${collection.slug}`}
        >
          <Text py={2} lineHeight="1.15" _hover={{ color: 'blue.500' }}>
            {collection.title}
          </Text>
        </Navigate>
      ))}
    </div>
  )
}
