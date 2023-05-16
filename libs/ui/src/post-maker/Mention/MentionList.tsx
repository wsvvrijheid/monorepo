// import { useContext } from 'react'

// import {
//   Box,
//   Tab,
//   TabList,
//   TabPanel,
//   TabPanels,
//   Tabs,
//   VStack,
// } from '@chakra-ui/react'
// import dynamic from 'next/dynamic'
// import { useTranslation } from 'next-i18next'
// import { UserV1 } from 'twitter-api-v2'

// import { HashtagContext } from '@wsvvrijheid/context'

// import { MentionListSkeleton } from './MentionListSkeleton'
// import { MentionSearch } from './MentionSearch'

// const MentionListItem = dynamic(() => import('./MentionListItem'), {
//   ssr: false,
// })

export const MentionList = () => {
  // const {
  //   // mentions,
  //   activePostId,
  //   searchedMentions,
  //   savedMentions,
  //   addMentionToPost,
  //   updateStoredMentions,
  //   removeStoredMention,
  // } = useHashtagContext()
  // const { t } = useTranslation()
  // const onAddMention = (value: UserV1) => {
  //   if (value.screen_name && currentPostId) {
  //     addMentionToPost(currentPostId, value.screen_name)
  //   }
  // }
  // const onRemoveMention = (value: UserV1) => {
  //   if (value.screen_name) {
  //     removeStoredMention(value.screen_name)
  //   }
  // }
  // const onAddUserMention = (value: UserV1) => {
  //   onAddMention(value)
  //   updateStoredMentions(value)
  //   // clearMentionSearches()
  // }
  // return (
  //   <VStack align="stretch" h="60%" data-tour="step-mention-list">
  //     <VStack
  //       minH="0"
  //       h="full"
  //       align="stretch"
  //       bg="white"
  //       overflowY="auto"
  //       shadow="base"
  //     >
  //       <Tabs
  //         size="sm"
  //         colorScheme={'primary'}
  //         isFitted
  //         variant="line"
  //         bg="white"
  //       >
  //         <TabList pos="sticky" top="0" bg="white">
  //           <Tab>{t('post.mention-tab-popular')}</Tab>
  //           <Tab>{t('post.mention-tab-saved')}</Tab>
  //         </TabList>
  //         <TabPanels>
  //           <TabPanel p={0}>
  //             <Box pos="sticky" top="31px">
  //               <MentionSearch />
  //             </Box>
  //             {searchedMentions.isLoading || mentions.isLoading ? (
  //               <MentionListSkeleton />
  //             ) : searchedMentions.data?.length > 0 ? (
  //               searchedMentions.data.map((data, i) => (
  //                 <MentionListItem
  //                   key={i}
  //                   data={data}
  //                   onAddItem={onAddUserMention}
  //                 />
  //               ))
  //             ) : (
  //               mentions.data?.map(({ data }, i) => (
  //                 <MentionListItem
  //                   key={i}
  //                   data={data as UserV1}
  //                   onAddItem={onAddMention}
  //                 />
  //               ))
  //             )}
  //           </TabPanel>
  //           <TabPanel p={0}>
  //             {savedMentions?.map((data, i) => (
  //               <MentionListItem
  //                 key={i}
  //                 data={data}
  //                 onRemoveItem={onRemoveMention}
  //                 onAddItem={onAddMention}
  //               />
  //             ))}
  //           </TabPanel>
  //         </TabPanels>
  //       </Tabs>
  //     </VStack>
  //   </VStack>
  // )

  return null
}
