import { createContext, useContext } from 'react'

import { useLocalStorage } from 'usehooks-ts'

type GeneratedArchiveContentPost = {
  description: string
  sentences: string[]
}

type GenPostValueType = {
  posts: GeneratedArchiveContentPost[]
  addPost: (post: GeneratedArchiveContentPost) => void
  removePosts: () => Promise<void>
}

const GenPostContext = createContext<GenPostValueType>({
  posts: [],
  addPost: () => null,
  removePosts: () => Promise.resolve(),
})

export const useGenPostContext = () => {
  return useContext(GenPostContext)
}

export const GenPostProvider = ({ children }: React.PropsWithChildren) => {
  const [posts, setPosts] = useLocalStorage<GeneratedArchiveContentPost[]>(
    'generated-archive-content-posts',
    [],
  )

  const addPost = (post: GeneratedArchiveContentPost) => {
    setPosts(prevPosts => [...prevPosts, { ...post }])
  }

  const removePosts = (): Promise<void> => {
    return new Promise(resolve => {
      setTimeout(() => {
        setPosts([])
        resolve()
      }, 5000)
    })
  }

  return (
    <GenPostContext.Provider value={{ posts, addPost, removePosts }}>
      {children}
    </GenPostContext.Provider>
  )
}
