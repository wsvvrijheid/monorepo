import { FC } from 'react'

import { HStack, VStack, Text, Button, Link } from '@chakra-ui/react'
import { GrDocumentDownload } from 'react-icons/gr'

interface DocumentCard {
  label: string
  url: string
}
export const DocumentCard: FC<DocumentCard> = ({ label, url }) => {
  return (
    <HStack>
      <GrDocumentDownload />
      <VStack>
        <Text fontWeight={'bold'} color={'primary.500'}>
          {label}
        </Text>
        <Button
          as={Link}
          isExternal
          variant="link"
          color="red"
          _hover={{ color: 'primary.100' }}
          href={url}
        >
          indir
        </Button>
      </VStack>
    </HStack>
  )
}
