import { useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import {
  useDeleteMainhashtag,
  useGetMentions,
  useHashtagsByFilterAndSort,
  usePublishModel,
  useUnpublishModel,
  useUpdateHashtagMutation,
} from '@wsvvrijheid/services'
import { StrapiLocale, Sort, Mention, Hashtag } from '@wsvvrijheid/types'
import {
  AdminLayout,
  CreateMainHashtagModal,
  MainHashtagDetailModal,
  MainHashtagTable,
  WConfirm,
  WConfirmProps,
} from '@wsvvrijheid/ui'
import { useUpdateEffect } from 'react-use'

const MainHashtagPage = () => {
  const [currentPage, setCurrentPage] = useState<number>()
  const defaultLocale: StrapiLocale = 'en'

  const openEditModal = useDisclosure()
  const [searchTerm, setSearchTerm] = useState<string>()
  const [locale, setLocale] = useState<StrapiLocale>(defaultLocale)
  const [sort, setSort] = useState<Sort>()
  const queryKey = ['hashtag', searchTerm, sort, currentPage || 1]
  const [selectedMainHashtag, setSelectedMainHashtag] = useState<Hashtag>()
  const HashtagsQuery = useHashtagsByFilterAndSort(queryKey, {
    sort,
    searchTerm,
    page: currentPage || 1,
    locale: locale as StrapiLocale,
  })
  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  const updateField = useUpdateHashtagMutation(queryKey)
  const deleteMainhashtag = useDeleteMainhashtag(queryKey)
  const publishMainhashtagMutation = usePublishModel('api/hashtags', queryKey)
  const unpublishMainhashtagMutation = useUnpublishModel(
    'api/hashtags',
    queryKey,
  )
  const [confirmState, setConfirmState] =
    useState<Omit<WConfirmProps, 'onClose' | 'isOpen' | 'onOpen'>>()
  const confirmDisclosure = useDisclosure()

  useUpdateEffect(() => {
    HashtagsQuery.refetch()
  }, [locale, searchTerm, sort])

  const hashtags = HashtagsQuery?.data?.data
  const totalCount = HashtagsQuery?.data?.meta?.pagination?.pageCount
  const currentMentions = useGetMentions()
  const mappedHashtags = hashtags?.map(hashtag => ({
    ...hashtag,
    translates: hashtag.localizations?.map(l => l.locale),
  }))
  //function ============
  const showEditModal = hashtagNew => {
    const refetchHashtag = mappedHashtags.filter(
      hashtag => hashtag.id === hashtagNew.id,
    )
    console.log('refetch data ', refetchHashtag)
    setSelectedMainHashtag(refetchHashtag[0])
    openEditModal.onOpen()
  }

  //delete mainhashtag =================
  const handleDelete = (id: number) => {
    confirmDisclosure.onOpen()
    setConfirmState({
      isWarning: true,
      title: 'Delete Mainhashtag',
      description: 'Are you sure you want to delete this mainhashtag?',
      buttonText: 'Delete',
      onConfirm: async () => {
        await deleteMainhashtag.mutateAsync({ id })
        setConfirmState(undefined)
        confirmDisclosure.onClose()
      },
    })
  }

  const onPublish = (id: number) => {
    confirmDisclosure.onOpen()
    setConfirmState({
      title: 'Publish Mainhashtag',
      description: `Are you sure you want to publish this mainhashtag ?`,
      buttonText: 'Publish',
      onConfirm: async () => {
        await publishMainhashtagMutation.mutateAsync({ id })
        setConfirmState(undefined)
        confirmDisclosure.onClose()
      },
    })
  }
  const onUnPublish = (id: number) => {
    confirmDisclosure.onOpen()
    setConfirmState({
      title: 'Un Publish Mainhashtag',
      description: `Are you sure you want to unpublish this mainhashtag ?`,
      buttonText: 'Unpublish',
      onConfirm: async () => {
        await unpublishMainhashtagMutation.mutateAsync({ id })
        setConfirmState(undefined)
        confirmDisclosure.onClose()
      },
    })
  }
  const onSave = async (id: number, newData: Hashtag, text: string) => {
    updateField.mutate(
      { id, [text]: newData },
      {
        onSuccess: res => {
          console.log('response in table', res)
        },
        onError: error => console.log('error in table', error),
      },
    )
  }

  return (
    <AdminLayout
      title="Main Hashtag"
      headerProps={{
        onSearch: handleSearch,
        onLanguageSwitch: locale => setLocale(locale),
        defaultLocale,
      }}
    >
      {confirmState && (
        <WConfirm
          isOpen={confirmDisclosure.isOpen}
          onClose={confirmDisclosure.onClose}
          {...confirmState}
        />
      )}
      <CreateMainHashtagModal showEditModal={showEditModal} />
      <MainHashtagTable
        data={mappedHashtags}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
        queryKey={queryKey}
        onDelete={handleDelete}
        onPublish={onPublish}
        unPublish={onUnPublish}
        onSave={onSave}
      />
      {selectedMainHashtag && (
        <MainHashtagDetailModal
          mainhashtagId={selectedMainHashtag?.id}
          mainhashtagTitle={selectedMainHashtag?.title}
          mainhashtagDescription={selectedMainHashtag?.description}
          mainhashtagContent={selectedMainHashtag?.content}
          mainhashtagDate={selectedMainHashtag?.date}
          mainhashtagHashtag={selectedMainHashtag?.hashtag}
          mainhashtagPublishedAt={selectedMainHashtag?.publishedAt}
          mainhashtagHashtagExtra={selectedMainHashtag?.hashtagExtra as string}
          mentions={currentMentions?.data as Mention[]} //
          mainhashtagMentions={selectedMainHashtag?.mentions as Mention[]}
          mainhashtagImage={selectedMainHashtag?.image as unknown as Blob[]}
          isOpen={openEditModal.isOpen}
          onClose={openEditModal.onClose}
          onDelete={handleDelete}
          onPublish={onPublish}
          unPublish={onUnPublish}
          onSave={onSave}
          posts={selectedMainHashtag?.posts}
        />
      )}
    </AdminLayout>
  )
}

export default MainHashtagPage
