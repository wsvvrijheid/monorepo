import { FC, useEffect, useState } from 'react'

import {
  Box,
  Center,
  Collapse,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  IconButton,
  Stack,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { TourProvider } from '@reactour/tour'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import {
  getHashtagBySlug,
  getHashtags,
  HashtagReturnType,
  setRandomPost,
  useHashtag,
  useHashtags,
  useLocaleTimeFormat,
} from '@wsvvrijheid/services'
import {
  checkSharedPosts,
  setDefaultHashtags,
  setDefaultTab,
  useAppDispatch,
  useAppSelector,
} from '@wsvvrijheid/store'
import { StrapiLocale } from '@wsvvrijheid/types'
import {
  Card,
  Container,
  PostArchive,
  PostMaker,
  PostMakerIcon,
  StepsContent,
  usePostMakerSteps,
} from '@wsvvrijheid/ui'
import { getItemLink, getPageSeo } from '@wsvvrijheid/utils'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'
import { useRouter } from 'next/router'
import {
  FaChevronDown,
  FaChevronUp,
  FaHashtag,
  FaImages,
  FaTwitter,
} from 'react-icons/fa'

import i18nConfig from '../../..//next-i18next.config'
import { Layout } from '../../../components'

interface HashtagProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  seo: NextSeoProps
  hasPassed: boolean
  hasStarted: boolean
  defaultHashtags: string[]
}

const Hashtag: FC<HashtagProps> = ({
  seo,
  hasPassed,
  hasStarted,
  defaultHashtags,
}) => {
  const { defaultTab } = useAppSelector(state => state.post)
  const dispatch = useAppDispatch()
  const { locale } = useRouter()

  const hashtagsQuery = useHashtags()
  const hashtagQuery = useHashtag()

  const { formattedDate, formattedDateDistance, timeZone } =
    useLocaleTimeFormat(hashtagQuery.data?.date as string, 'dd MMMM HH:mm')

  const [show, setShow] = useState<boolean>(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleToggle = () => setShow(!show)

  const { t } = useTranslation()

  const isMobile = useBreakpointValue({ base: true, lg: false })
  const postMakerSteps = usePostMakerSteps()
  const steps = isMobile ? postMakerSteps.mobile : postMakerSteps.desktop
  const disableBody = (target: Element | null) =>
    target && disableBodyScroll(target)
  const enableBody = (target: Element | null) =>
    target && enableBodyScroll(target)

  useEffect(() => {
    if (defaultHashtags.length > 0)
      dispatch(setDefaultHashtags(defaultHashtags))

    if (hasPassed && defaultTab === null) dispatch(setDefaultTab(1))
  }, [defaultHashtags, dispatch, hasPassed, defaultTab])

  useEffect(() => {
    dispatch(checkSharedPosts())
  }, [dispatch])

  return (
    <TourProvider
      steps={steps}
      components={{}}
      afterOpen={disableBody}
      beforeClose={enableBody}
      ContentComponent={StepsContent}
      padding={{ mask: 6 }}
      styles={{
        popover: base => ({
          ...base,
          padding: 4,
          backgroundColor: 'transparent',
        }),
      }}
    >
      <Layout seo={seo}>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{t`post.all-hashtags`}</DrawerHeader>

            <DrawerBody>
              <Stack spacing={4}>
                {hashtagsQuery.data?.map(hashtag => (
                  <Card
                    key={hashtag.id}
                    title={hashtag.title}
                    image={hashtag.image?.url}
                    description={hashtag.description}
                    link={
                      getItemLink(
                        hashtag,
                        locale as StrapiLocale,
                        'hashtag',
                      ) as string
                    }
                  />
                ))}
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <Container py={4} pos="relative">
          <Box flex={1} textAlign="center">
            <Heading>
              {hashtagQuery.data?.title}{' '}
              <Tooltip label={t`post.all-hashtags`} hasArrow bg="primary.400">
                <IconButton
                  aria-label="open hashtags"
                  onClick={onOpen}
                  icon={<FaHashtag />}
                  colorScheme="primary"
                  size="lg"
                  title={t`post.all-hashtags`}
                  rounded="full"
                  pos={{ base: 'static', lg: 'absolute' }}
                  top={4}
                  right={2}
                />
              </Tooltip>
            </Heading>

            <Collapse startingHeight={50} in={show}>
              <Text my={4} maxW="container.md" mx="auto">
                {hashtagQuery.data?.content}
              </Text>
            </Collapse>
            <IconButton
              variant="ghost"
              size="sm"
              icon={show ? <FaChevronUp /> : <FaChevronDown />}
              aria-label={show ? 'up' : 'down'}
              _hover={{ bg: 'transparent' }}
              onClick={handleToggle}
            />
          </Box>
          {hasStarted && hashtagQuery.data?.hashtag ? (
            <Tabs
              flex={1}
              isFitted
              colorScheme="primary"
              index={defaultTab || 0}
              onChange={index => dispatch(setDefaultTab(index))}
              isLazy
            >
              <Stack
                direction={{ base: 'row', xl: 'column' }}
                pos={{ base: 'static', xl: 'fixed' }}
                top={256}
                left={0}
                spacing={1}
                zIndex="tooltip"
              >
                <Tab
                  borderWidth={1}
                  borderColor="gray.300"
                  mb={0}
                  bg="white"
                  borderRadius={{ base: 'sm', lg: 'none' }}
                  _selected={{
                    bg: 'primary.400',
                    borderColor: 'primary.400',
                    color: 'white',
                  }}
                >
                  <Box as={FaTwitter} mr={2} />
                  <Box>{t`post.tabs.share`}</Box>
                </Tab>
                <Tab
                  borderWidth={1}
                  borderColor="gray.300"
                  bg="white"
                  borderRadius={{ base: 'sm', lg: 'none' }}
                  _selected={{
                    bg: 'primary.400',
                    borderColor: 'primary.400',
                    color: 'white',
                  }}
                >
                  <Box as={FaImages} mr={2} />
                  <Box>{t`post.tabs.archive`}</Box>
                </Tab>
              </Stack>
              <TabPanels>
                <TabPanel px={0} py={4}>
                  <PostMaker />
                </TabPanel>
                <TabPanel p={0} py={4}>
                  <PostArchive />
                </TabPanel>
              </TabPanels>
            </Tabs>
          ) : (
            <Center minH={500}>
              <Stack
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                py={16}
                px={{ base: 4, lg: 16 }}
                maxW={700}
                rounded="lg"
                spacing={2}
                bg="#9EDEF8"
                w="full"
              >
                <PostMakerIcon boxSize={300} />

                <Heading color="twitter.800" fontSize="2xl">
                  {t('post.will-start', { time: formattedDateDistance })}
                </Heading>
                <Text>
                  {formattedDate} ({timeZone})
                </Text>
              </Stack>
            </Center>
          )}
        </Container>
      </Layout>
    </TourProvider>
  )
}

export default Hashtag

export const getServerSideProps: GetServerSideProps = async context => {
  const locale = context.locale as StrapiLocale
  const slug = context.params?.slug as string

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['hashtags', locale],
    queryFn: () => getHashtags(locale),
  })

  await queryClient.prefetchQuery({
    queryKey: ['hashtag', locale, slug],
    queryFn: () => getHashtagBySlug(locale, slug),
  })

  const hashtag = queryClient.getQueryData<HashtagReturnType>([
    'hashtag',
    locale,
    slug,
  ])

  if (!hashtag) {
    return { notFound: true }
  }

  const slugs =
    hashtag.localizations?.reduce(
      (acc, l) => {
        acc[l.locale as StrapiLocale] = l.slug
        return acc
      },
      { en: '', nl: '', tr: '' },
    ) || {}

  setRandomPost(queryClient, locale, slug)

  const seo: NextSeoProps = getPageSeo(hashtag, locale, 'hashtag')

  const source = await serialize(hashtag?.content || '')

  return {
    props: {
      source,
      seo,
      slugs: { ...slugs, [locale]: slug },
      hasPassed: hashtag.hasPassed,
      hasStarted: hashtag.hasStarted,
      defaultHashtags: hashtag.defaultHashtags,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(
        locale as StrapiLocale,
        ['common'],
        i18nConfig,
      )),
    },
  }
}
