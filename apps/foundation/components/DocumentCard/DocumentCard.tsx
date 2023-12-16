import { FC } from 'react'

import { HStack, VStack, Text, Button, Link } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { GrDocumentDownload } from 'react-icons/gr'

interface DocumentCard {
  label: string
  url: string
}
export const DocumentCard: FC<DocumentCard> = ({ label, url }) => {
  const { t } = useTranslation()

  return (
    <HStack spacing={4} pr={{ base: 4, lg: 8 }}>
      <GrDocumentDownload />
      <VStack alignItems={'start'}>
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
          {t('dowload')}
        </Button>
      </VStack>
    </HStack>
  )
}
