import { FC, useState } from 'react'

import {
  Link,
  Stack,
  HStack,
  Button,
  ButtonProps,
  Spacer,
} from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
export type NavItemProps = [{ label: string; link: string; icon: IconType }]
export type AdminNavItemProps = {
  label: string
  link: string
  submenu?: NavItemProps[]
  icon: IconType
} & ButtonProps

export const AdminNavItem: FC<AdminNavItemProps> = ({
  label,
  link,
  submenu,
  icon,
}) => {
  const [up, setUp] = useState(false)
  return (
    <Stack w="full">
      <HStack>
        <Link href={link}>
          <Button
            variant={'gray.500'}
            colorScheme="primary"
            size="lg"
            leftIcon={icon}
            aria-label={''}
            _hover={{ color: 'blue.500' }}
          >
            {label}
          </Button>
        </Link>
        <Spacer />
        {up ? (
          <Button
            onClick={() => setUp(false)}
            variant={'gray.500'}
            colorScheme="primary"
            size="lg"
            rightIcon={submenu ? <BiChevronUp /> : ''}
            aria-label={''}
            _hover={{ color: 'blue.500' }}
          ></Button>
        ) : (
          <Button
            onClick={() => setUp(true)}
            variant={'gray.500'}
            colorScheme="primary"
            size="lg"
            rightIcon={submenu ? <BiChevronDown /> : ''}
            aria-label={''}
            _hover={{ color: 'blue.500' }}
          ></Button>
        )}
      </HStack>
      {/* submenu ====================*/}
      {up
        ? submenu?.map(item => {
            return (
              <Link href={item.link}>
                <Button
                  ml={10}
                  variant={'gray.500'}
                  colorScheme="primary"
                  size="xs"
                  leftIcon={item.icon}
                  _hover={{ color: 'blue.500' }}
                >
                  {item.label}
                </Button>
              </Link>
            )
          })
        : ''}
    </Stack>
  )
}
