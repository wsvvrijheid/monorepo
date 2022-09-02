import { FC, LegacyRef, useRef } from 'react'
import { Center, Spinner } from '@chakra-ui/react'
import { CollectionBook, Container } from '@wsvvrijheid/ui'
import { Collection } from '@wsvvrijheid/types'

export type CollectionTempleteProps = {
  isLoading: boolean
  height: number
  width: number
  pageShow: number
  collection: Collection
  centerRef: LegacyRef<HTMLDivElement>
}

export const CollectionTemplate: FC<CollectionTempleteProps> = ({
  centerRef,
  isLoading,
  height,
  width,
  pageShow,
  collection,
}) => {
  return (
    <Container minH="inherit">
      <Center ref={centerRef} py={8} minH="inherit">
        {isLoading || !height ? (
          <Spinner />
        ) : (
          <CollectionBook
            collection={collection}
            flipboxProps={{
              height,
              minHeight: height,
              width: width / pageShow,
              minWidth: width / pageShow,
            }}
          />
        )}
      </Center>
    </Container>
  )
}
