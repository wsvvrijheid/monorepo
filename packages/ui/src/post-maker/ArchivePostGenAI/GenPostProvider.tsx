import { createContext, useContext, useState } from 'react'

type GeneratedArchiveContentPost = {
  description: string
  sentences: string[]
}

type GenPostValueType = {
  posts: GeneratedArchiveContentPost[]
  addPost: (post: GeneratedArchiveContentPost) => void
}

const GenPostContext = createContext<GenPostValueType>({
  posts: [],
  addPost: () => null,
})

export const useGenPostContext = () => {
  return useContext(GenPostContext)
}

export const GenPostProvider = ({ children }: React.PropsWithChildren) => {
  const [posts, setPosts] = useState<GeneratedArchiveContentPost[]>([])

  const addPost = (post: GeneratedArchiveContentPost) => {
    setPosts(prevPosts => [...prevPosts, { ...post }])
  }

  return (
    <GenPostContext.Provider value={{ posts, addPost }}>
      {children}
    </GenPostContext.Provider>
  )
}
