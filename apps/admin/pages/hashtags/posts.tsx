import { useState } from 'react'

// import { API_URL, TOKEN } from '@wsvvrijheid/config'
// import { Request } from '@wsvvrijheid/lib'
import { usePosts, usePostsByFilterAndSort } from '@wsvvrijheid/services' //usePosts
import { StrapiLocale, Sort, Post } from '@wsvvrijheid/types'
import { AdminLayout, PostsTable } from '@wsvvrijheid/ui'
import { useUpdateEffect } from 'react-use'

const HashtagPostsPage = () => {
  const [currentPage, setCurrentPage] = useState<number>()
  const defaultLocale: StrapiLocale = 'en'

  const [searchTerm, setSearchTerm] = useState<string>()
  const [locale, setLocale] = useState<StrapiLocale>(defaultLocale)
  const [sort, setSort] = useState<Sort>()
  const queryKey = ['posts', searchTerm, sort, currentPage || 1]

  const getPosts = usePosts()
  console.log('get posts all >>>>>>>', getPosts?.data)

  // const lastPost = async () => {
  //   const requestUrl = `${API_URL}/api/posts`
  //   const response = await fetch(requestUrl, {
  //     headers: {
  //       Authorization: `Bearer ${TOKEN}`,
  //     },
  //   })

  //   const data = await response.json()
  //   console.log('response in last CCCCCCCCCC', data)
  //   return data
  // }
  // lastPost()

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
  console.log('posts >>>>>>> ', PostsQuery?.data)

  const totalCount = PostsQuery?.data?.meta?.pagination?.pageCount
  console.log('posts >>>>>>> ', totalCount)

  const mappedPosts = posts?.map(posts => ({
    ...posts,
    translates: posts?.localizations?.map(l => l.locale),
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
      <PostsTable
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
