import { FC } from 'react'

import { HStack, IconButton } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { IconType } from 'react-icons/lib'

import { Localize } from '@wsvvrijheid/types'

export type SocialItem = {
  label: string
  icon: IconType
  link: Localize<string>
}

export interface SocialButtonsProps {
  items: SocialItem[]
}

export const SocialButtons: FC<SocialButtonsProps> = ({ items }) => {
  const { locale } = useRouter()

  return (
    <HStack align="start">
      {items?.map((item, i) => (
        <IconButton
          key={i}
          aria-label={item.label}
          as="a"
          size="sm"
          target="_blank"
          icon={<item.icon />}
          href={item.link[locale]}
          variant="outline"
          colorScheme="primary"
          borderColor="primary.200"
          color="primary.200"
          _hover={{
            bg: 'whiteAlpha.100',
            borderColor: 'primary.50',
            color: 'primary.50',
          }}
        />
      ))}
    </HStack>
  )
}
