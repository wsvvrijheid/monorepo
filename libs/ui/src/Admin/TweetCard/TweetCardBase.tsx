import { FC } from 'react'

import {
  Avatar,
  Button,
  Grid,
  GridItem,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { BsPatchCheckFill } from 'react-icons/bs'

import { TweetBaseCardProps } from './types'

export const TweetCardBase: FC<TweetBaseCardProps> = ({
  tweet,
  defaultLocale,
  options,
}) => {
  return (
    <Grid
      w={'460px'}
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={4}
      bg={'white'}
      p={2}
      borderRadius={'10px'}
    >
      <GridItem rowSpan={3} colSpan={1}>
        <Avatar src={tweet.user.profile} />
      </GridItem>
      <GridItem colSpan={4} ml={-5} mt={-2}>
        <HStack justifyContent={'space-between'}>
          <HStack>
            <Text fontSize={'sm'} fontWeight={'bolder'}>
              {tweet.user.name}
            </Text>
            <BsPatchCheckFill color="#1da1f2" size={'15px'} />
            <Text fontSize={'xs'} color={'gray'}>
              @{tweet.user.username}
            </Text>
          </HStack>
          <Menu>
            <MenuButton
              colorScheme={'teal'}
              variant={'ghost'}
              color="gray"
              borderRadius="50%"
              width="20px"
              height="40px"
              padding="0"
              pb={2}
              _hover={{
                bg: 'lightgray',
                color: 'primary.400',
              }}
              as={Button}
            >
              ...
            </MenuButton>
            {options && <MenuList>{options}</MenuList>}
          </Menu>
        </HStack>
      </GridItem>
      <GridItem colSpan={4} mt={-5} ml={-5}>
        <HStack>
          <Text fontSize={'small'}>{tweet.text}</Text>
        </HStack>
      </GridItem>
      {tweet.image && (
        <GridItem colSpan={4} ml={-5}>
          <HStack>
            <Image src={tweet.image} borderRadius={'10px'} />
          </HStack>
        </GridItem>
      )}
      {tweet.videos && (
        <GridItem colSpan={4} ml={-5}>
          <HStack maxW={'460px'}>
            <iframe
              src={tweet.videos[0].url}
              title={tweet.videos[0].content_type}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </HStack>
        </GridItem>
      )}
    </Grid>
  )
}
