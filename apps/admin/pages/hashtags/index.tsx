import { useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import {
  useDeleteMainhashtag,
  useHashtagsByFilterAndSort,
  usePublishModel,
  useUnpublishModel,
} from '@wsvvrijheid/services'
import { StrapiLocale, Sort, Hashtag } from '@wsvvrijheid/types'
import {
  AdminLayout,
  CreateMainHashtagModal,
  MainHashtagDetailModal,
  MainHashtagTable,
  WConfirm,
  WConfirmProps,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'
import { useUpdateEffect } from 'react-use'

const MainHashtagPage = () => {
  const [sort, setSort] = useState<Sort>()
  const [selectedMainHashtag, setSelectedMainHashtag] = useState<Hashtag>()
  const [currentPage, setCurrentPage] = useState<number>()
  const [searchTerm, setSearchTerm] = useState<string>()
  const { locale } = useRouter()

  const openEditModal = useDisclosure()

  const queryKey = ['hashtag', searchTerm, sort, currentPage || 1]

  const HashtagsQuery = useHashtagsByFilterAndSort(queryKey, {
    sort,
    searchTerm,
    page: currentPage || 1,
    locale: locale as StrapiLocale,
  })

  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  const deleteMainhashtag = useDeleteMainhashtag(queryKey)
  const publishMainhashtagMutation = usePublishModel('api/hashtags', queryKey)
  const unpublishMainhashtagMutation = useUnpublishModel(
    'api/hashtags',
    queryKey,
  )
  const [confirmState, setConfirmState] = useState<WConfirmProps>()

  useUpdateEffect(() => {
    HashtagsQuery.refetch()
  }, [locale, searchTerm, sort])

  const hashtags = HashtagsQuery?.data?.data
  const totalCount = HashtagsQuery?.data?.meta?.pagination?.pageCount
  const hashtagWithLocalizeKeys = hashtags?.map(hashtag => ({
    ...hashtag,
    translates: hashtag.localizations?.map(l => l.locale),
  }))

  const showEditModal = (newHashtag: Hashtag) => {
    setSelectedMainHashtag(newHashtag)
    openEditModal.onOpen()
  }

  //delete mainhashtag =================
  const handleDelete = (id: number) => {
    setConfirmState({
      ...confirmState,
      isWarning: true,
      title: 'Delete Mainhashtag',
      description: 'Are you sure you want to delete this mainhashtag?',
      buttonText: 'Delete',
      onConfirm: async () => {
        await deleteMainhashtag.mutateAsync({ id })
        setConfirmState(undefined)
        openEditModal.onClose()
      },
    })
  }

  const onPublish = (id: number) => {
    setConfirmState({
      ...confirmState,
      title: 'Publish Mainhashtag',
      description: `Are you sure you want to publish this mainhashtag ?`,
      buttonText: 'Publish',
      onConfirm: async () => {
        await publishMainhashtagMutation.mutateAsync({ id })
        setConfirmState(undefined)
      },
    })
  }

  const onUnPublish = (id: number) => {
    setConfirmState({
      ...confirmState,
      title: 'Un Publish Mainhashtag',
      description: `Are you sure you want to unpublish this mainhashtag ?`,
      buttonText: 'Unpublish',
      onConfirm: async () => {
        await unpublishMainhashtagMutation.mutateAsync({ id })
        setConfirmState(undefined)
      },
    })
  }

  return (
    <AdminLayout
      title="Main Hashtag"
      headerProps={{
        onSearch: handleSearch,
      }}
    >
      {confirmState && <WConfirm {...confirmState} />}
      <CreateMainHashtagModal showEditModal={showEditModal} />
      <MainHashtagTable
        data={hashtagWithLocalizeKeys}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
        queryKey={queryKey}
        onDelete={handleDelete}
        onPublish={onPublish}
        unPublish={onUnPublish}
        onClose={() => null}
      />
      {selectedMainHashtag && openEditModal.isOpen && (
        <MainHashtagDetailModal
          localizeHashtag={{
            tr: selectedMainHashtag,
            en: selectedMainHashtag,
            nl: selectedMainHashtag,
          }}
          isOpen={openEditModal.isOpen}
          onClose={openEditModal.onClose}
          onDelete={handleDelete}
          onPublish={onPublish}
          unPublish={onUnPublish}
        />
      )}
    </AdminLayout>
  )
}

export default MainHashtagPage
