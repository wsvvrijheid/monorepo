import { FC } from 'react'

import { AspectRatio, Card, LinkBox, LinkOverlay, Text } from '@chakra-ui/react'
import Link from 'next/link'

import { WImage } from '../../components'

type AcademyCardProps = {
  children: React.ReactNode
  href: string
  image: string
  description?: string
}

export const AcademyCard: FC<AcademyCardProps> = ({
  children,
  href,
  image,
  description,
}) => {
  return (
    <LinkBox as="article">
      <LinkOverlay as={Link} href={href}>
        <AspectRatio ratio={1}>
          <Card
            rounded="xl"
            position="relative"
            role="group"
            overflow="hidden"
            w="100%"
          >
            <WImage
              src={image}
              _groupHover={{ transform: 'scale(1.05 )' }}
              transition={'all'}
              transitionDuration={'0.2s'}
            />
            <Text
              transform={'translateY(6rem)'}
              w="100%"
              p="5"
              fontSize="lg"
              color="white"
              position="absolute"
              fontWeight="medium"
              bottom="0"
              _groupHover={{ transform: 'translateY(-5px)' }}
              transition="all"
              transitionDuration="0.3s"
            >
              <LinkOverlay as={Link} href={href}>
                {children}
              </LinkOverlay>
              {description && (
                <Text
                  pt="2"
                  noOfLines={3}
                  transition="all"
                  fontWeight="thin"
                  transitionDuration="0.8s"
                >
                  {description}
                </Text>
              )}
            </Text>
          </Card>
        </AspectRatio>
      </LinkOverlay>
    </LinkBox>
  )
}
