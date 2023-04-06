import { FC } from 'react'

import { Card, Link, Text } from '@chakra-ui/react'

import { WImage } from '../../components'

type AcademyCardProps = {
  children: React.ReactNode
  href: string
  image: string
}

export const AcademyCard: FC<AcademyCardProps> = ({
  children,
  href,
  image,
}) => {
  return (
    <Link href={href}>
      <Card w={{ base: 48, lg: 64 }} h={{ base: 48, lg: 64 }} overflow="hidden">
        <WImage src={image} />
        <Text
          px="3"
          fontSize="lg"
          color="white"
          fontWeight="medium"
          position="absolute"
          bottom="5"
        >
          {children}
        </Text>
      </Card>
    </Link>
  )
}
