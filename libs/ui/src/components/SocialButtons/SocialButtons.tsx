import { FC } from 'react'

import { HStack, IconButton } from '@chakra-ui/react'
import { Localize, StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'
import { IconType } from 'react-icons/lib'

export type SocialItem = {
  label: string
  icon: IconType
  link: Localize<string>
}

interface SocialButtonsProps {
  items: SocialItem[]
}

export const SocialButtons: FC<SocialButtonsProps> = ({ items }) => {
  const { locale } = useRouter()
  return (
    <HStack align="start">
      {items.map((item, i) => (
        <IconButton
          key={i}
          aria-label={item.label}
          as="a"
          size="sm"
          target="_blank"
          icon={<item.icon />}
          href={item.link[locale as StrapiLocale]}
          variant="outline"
          colorScheme="primary"
          borderColor="primary.200"
          color="primary.200"
          _hover={{ bg: 'whiteAlpha.100' }}
        />
      ))}
    </HStack>
  )
}
