import React, { useEffect, useState } from 'react'

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useDisclosure,
  useUpdateEffect,
} from '@chakra-ui/react'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { useRouter } from 'next/router'
import { AiOutlineDownload } from 'react-icons/ai'

import { ASSETS_URL, SITE_URL } from '@wsvvrijheid/config'
import {  useSearchModel } from '@wsvvrijheid/services'
import { Post, StrapiLocale } from '@wsvvrijheid/types'
import { getOgImageSrc } from '@wsvvrijheid/utils'

import { Caps, WImage } from '../../components'

export const DowloadCapsModal = ({ hashtagsQuery }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const [hashtagsId, setHashtagId] = useState<number[]>([])

  const { locale } = useRouter()

  const postsQuery = useSearchModel<Post>({
    url: 'api/posts',
    relationFilter: {
      parent: 'hashtag',
      ids: hashtagsId,
    },
    locale: locale as StrapiLocale,
    statuses: ['approved'],
    publicationState: 'preview',
  })


  const handleClose = () => {
    setHashtagId([])

    onClose()
  }
  useUpdateEffect(() => {
    postsQuery.refetch()
  }, [hashtagsId])
  const onDownload = async () => {
    const postMedias = postsQuery?.data?.data.map(post => {
      const autoCaps =
        post.imageParams && SITE_URL + getOgImageSrc(post.imageParams)

      return {
        caps: post.caps?.url,
        autoCaps,
        image: post.image,
      }
    })

    const zip = new JSZip()
    const imgFolder = zip.folder('hashtag-images')

    await Promise.all(
      postMedias.map(async (media, index) => {
        const imageUrl = media.caps || media.autoCaps || media.image?.url

        if (imageUrl) return

        try {
          const response = await fetch(imageUrl, { mode: 'no-cors' })
          const blob = await response.blob()
          imgFolder.file(`image-${index}.jpeg`, blob)
        } catch (error) {
          console.log('try error', error)
        }
      }),
    )

    const allImages = await zip.generateAsync({ type: 'blob' })

    saveAs(allImages)
  }

  const hashtagFilter = (
    <MenuOptionGroup
      title="Hastags"
      type="checkbox"
      onChange={(value: string[]) => setHashtagId(value.map(v => +v))}
    >
      {hashtagsQuery.data?.data?.map(hashtag => (
        <MenuItemOption key={hashtag.id} value={`${hashtag.id}`}>
          {hashtag.title}
        </MenuItemOption>
      ))}
    </MenuOptionGroup>
  )

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        Caps
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={handleClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Chose hashtags and dowload caps</DrawerHeader>
          <DrawerBody>
            {hashtagFilter && (
              <Menu closeOnSelect={false}>
                <MenuButton
                  aria-label="choose caps"
                  as={IconButton}
                  icon={<AiOutlineDownload />}
                  variant="outline"
                  rounded="full"
                  colorScheme="gray"
                />
                <MenuList>{hashtagFilter}</MenuList>
              </Menu>
            )}
            <Stack>
              {postsQuery?.data?.data?.map((post, index) => {
                let newUrl = ''
                if (post?.image) {
                  newUrl = `${
                    post?.image.url.startsWith('http')
                      ? post?.image.url
                      : ASSETS_URL + post?.image.url
                  }`
                  console.log('urls ><<<<<<<<', newUrl)
                } else if (post?.caps) {
                  newUrl = `${
                    post?.caps.url.startsWith('http')
                      ? post?.caps.url
                      : ASSETS_URL + post?.caps.url
                  }`
                  console.log('urls ><<<<<<<<', newUrl)
                } else {
                  const autoCaps =
                    post.imageParams &&
                    SITE_URL + getOgImageSrc(post.imageParams)
                  newUrl = autoCaps
                }

                return (
                  <>
                    {post?.caps && (
                      <WImage
                        key={index}
                        alignSelf="center"
                        boxSize={48}
                        src={newUrl}
                        alt={post?.title}
                      />
                    )}

                    {post && (
                      <Caps
                        imageParams={{
                          title: post?.title,
                          text: post?.description as string,
                          image: newUrl,
                          ...(post as Post)?.imageParams,
                        }}
                      />
                    )}
                  </>
                )
              })}
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={onDownload} colorScheme="blue">
              Dowload Caps
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
