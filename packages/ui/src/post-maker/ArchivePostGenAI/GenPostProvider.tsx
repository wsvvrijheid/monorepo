import { createContext, useContext } from 'react'

import { useLocalStorage } from 'usehooks-ts'

type GeneratedArchiveContentPost = {
  description: string
  sentences: string[]
}

type ArchiveContentPosts = Record<number, GeneratedArchiveContentPost[]>

type GenPostValueType = {
  posts: ArchiveContentPosts
  addPost: (id: number, post: GeneratedArchiveContentPost) => void
  removePosts: (id: number) => Promise<void>
}

const GenPostContext = createContext<GenPostValueType>({
  posts: {},
  addPost: () => null,
  removePosts: () => Promise.resolve(),
})

export const useGenPostContext = () => {
  return useContext(GenPostContext)
}

export const GenPostProvider = ({ children }: React.PropsWithChildren) => {
  const [posts, setPosts] = useLocalStorage<ArchiveContentPosts>(
    'generated-archive-content-posts',
    [],
  )

  const addPost = (id: number, post: GeneratedArchiveContentPost) => {
    setPosts(prevPosts => {
      const newPosts = { ...prevPosts }
      newPosts[id] = newPosts[id] ? [...newPosts[id], post] : [post]

      return newPosts
    })
  }

  const removePosts = (id: number): Promise<void> => {
    return new Promise(resolve => {
      setPosts(prevPosts => {
        const newPosts = { ...prevPosts }
        delete newPosts[id]

        return newPosts
      })

      resolve()
    })
  }

  return (
    <GenPostContext.Provider value={{ posts, addPost, removePosts }}>
      {children}
    </GenPostContext.Provider>
  )
}
