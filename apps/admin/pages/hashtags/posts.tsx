import { useState } from 'react'

import { usePostsByFilterAndSort } from '@wsvvrijheid/services' //usePosts
import { StrapiLocale, Sort } from '@wsvvrijheid/types'
import { AdminLayout, MainHashtagTable } from '@wsvvrijheid/ui'
import { useUpdateEffect } from 'react-use'

const HashtagPostsPage = () => {
  const [currentPage, setCurrentPage] = useState<number>()
  const defaultLocale: StrapiLocale = 'en'

  const [searchTerm, setSearchTerm] = useState<string>()
  const [locale, setLocale] = useState<StrapiLocale>(defaultLocale)
  const [sort, setSort] = useState<Sort>()
  const queryKey = ['posts', searchTerm, sort, currentPage || 1]
  // const getPosts = usePosts()
  // console.log('get posts all >>>>>>>', getPosts?.data)

  const PostsQuery = usePostsByFilterAndSort(queryKey, {
    sort,
    searchTerm,
    page: currentPage || 1,
    locale: locale as StrapiLocale,
  })
  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useUpdateEffect(() => {
    PostsQuery.refetch()
  }, [locale, searchTerm, sort])

  const posts = PostsQuery?.data?.data
  console.log('posts >>>>>>> ', posts)

  const totalCount = PostsQuery?.data?.meta?.pagination?.pageCount
  console.log('total count', totalCount)

  const mappedPosts = posts?.map(posts => ({
    ...posts,
    translates: posts.localizations?.map(l => l.locale),
  }))
  console.log('mappded posts >>>>>>', mappedPosts)

  return (
    <AdminLayout
      title="HashtagPosts"
      headerProps={{
        onSearch: handleSearch,
        onLanguageSwitch: locale => setLocale(locale),
        defaultLocale,
      }}
    >
      <MainHashtagTable
        data={mappedPosts}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
      />
    </AdminLayout>
  )
}

export default HashtagPostsPage
