import { FC } from 'react'

import { Card, CardBody, Link, Text } from '@chakra-ui/react'

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
      <Card w={64} h={64}>
        <CardBody position="relative">
          <WImage src={image} />
          <Text position="absolute" bottom="5">
            {children}
          </Text>
        </CardBody>
      </Card>
    </Link>
  )
}
