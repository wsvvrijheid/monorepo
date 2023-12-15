import { FC } from "react"

import { HStack, VStack ,Text} from "@chakra-ui/react"
import { GrDocumentDownload } from "react-icons/gr"

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
        <Text color='primary.700'>{'.............url'}</Text>
      </VStack>
    </HStack>
  )
}