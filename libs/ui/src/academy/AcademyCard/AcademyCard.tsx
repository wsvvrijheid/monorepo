import { FC } from 'react'

import { Card, CardBody, Text } from '@chakra-ui/react'

// import { WImage } from '../../components'

type AcademyCardProps = {
  children: React.ReactNode
  // image: string
}

export const AcademyCard: FC<AcademyCardProps> = ({ children }) => {
  return (
    <Card w={64} h={64}>
      <CardBody>
        <Text>{children}</Text>
      </CardBody>
    </Card>
  )
}
