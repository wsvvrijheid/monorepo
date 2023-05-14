import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserV1 } from 'twitter-api-v2'

import { fetchMentions, searchMentions } from './actions'
import { LOCAL_STORAGE_MENTIONS_KEY } from './constants'
import { HashtagState } from './types'
import { updatePostContent } from './updatePostContent'

const searchedMentionsStorage: UserV1[] = []
// typeof window !== 'undefined' &&
// localStorage.getItem(LOCAL_STORAGE_MENTIONS_KEY)
//   ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_MENTIONS_KEY) as string)
//   : []

const initialState: HashtagState = {
  data: null,
  defaultHashtags: [],
  currentPostId: null,
  mentions: {
    isLoading: false,
    data: [],
    isError: false,
  },
  searchedMentions: {
    isLoading: false,
    data: searchedMentionsStorage,
    isError: false,
  },
  savedMentions: [],
  posts: [],
  quotes: [],
  trends: [],
  trendNames: [],
  isTrendsModalOpen: false,
  isMentionsModalOpen: false,
}

export const hashtagSlice = createSlice({
  name: 'hashtag',
  initialState,
  reducers: {
    // Mention
    addMentionToPost: (
      state,
      action: PayloadAction<{ postId: number; mention: string }>,
    ) => {
      const { postId, mention } = action.payload
      const post = state.posts.find(p => p.data?.id === postId)

      if (!post?.data) return

      post.mentionUsernames.push(mention)
      updatePostContent(state, postId)
    },
    clearMentionSearches: state => {
      state.searchedMentions = {
        isLoading: false,
        data: [],
        isError: false,
      }
    },
    removeMentionFromPost: (
      state,
      action: PayloadAction<{ postId: number; mention: string }>,
    ) => {
      const { postId, mention } = action.payload
      const post = state.posts.find(p => p.data?.id === postId)

      if (!post?.data) return

      post.mentionUsernames = post.mentionUsernames.filter(m => m !== mention)
      updatePostContent(state, postId)
    },
    // Saved Mention
    removeStoredMention: (state, action: PayloadAction<string>) => {
      const savedList = state.savedMentions.filter(
        user => user.screen_name !== action.payload,
      )
      localStorage.setItem(
        LOCAL_STORAGE_MENTIONS_KEY,
        JSON.stringify(savedList),
      )
      state.savedMentions = savedList
    },
    updateStoredMentions: (state, action: PayloadAction<UserV1>) => {
      state.savedMentions.push(action.payload)
      localStorage.setItem(
        LOCAL_STORAGE_MENTIONS_KEY,
        JSON.stringify(state.savedMentions),
      )
    },
    // Trend
    addTrendToPost: (
      state,
      action: PayloadAction<{ postId: number; trend: string }>,
    ) => {
      const { postId, trend } = action.payload

      const post = state.posts.find(p => p.data?.id === postId)

      if (!post?.data) return

      post.trendNames.push(trend)
      updatePostContent(state, post.data.id)
    },
    removeTrendFromPost: (
      state,
      action: PayloadAction<{ postId: number; trend: string }>,
    ) => {
      const { postId, trend } = action.payload
      const post = state.posts.find(p => p.data?.id === postId)

      if (!post?.data) return

      post.trendNames = post.trendNames.filter(m => m !== trend)
      updatePostContent(state, postId)
    },
    setDefaultHashtags: (state, action: PayloadAction<string[]>) => {
      state.defaultHashtags = action.payload

      state.posts.forEach(post => {
        if (!post.data) return

        post.defaultHashtags = action.payload

        updatePostContent(state, post.data.id)
      })
    },
    // Post
    setPostText: (
      state,
      action: PayloadAction<{ postId: number; content: string }>,
    ) => {
      const { postId, content } = action.payload
      const post = state.posts.find(p => p.data?.id === postId)

      if (!post?.data) return

      post.text = content
      updatePostContent(state, postId)
    },
    toggleTrendsModal: state => {
      state.isTrendsModalOpen = !state.isTrendsModalOpen
    },
    toggleMentionsModal: state => {
      state.isMentionsModalOpen = !state.isMentionsModalOpen
    },
  },
  extraReducers: builder => {
    builder.addCase(searchMentions.fulfilled, (state, action) => {
      state.searchedMentions.data = action.payload
      state.searchedMentions.isError = false
      state.searchedMentions.isLoading = false
    })
    builder.addCase(searchMentions.pending, state => {
      state.searchedMentions.isLoading = true
      state.searchedMentions.isError = false
    })
    builder.addCase(searchMentions.rejected, state => {
      state.searchedMentions.isError = true
      state.searchedMentions.isLoading = false
    })
    builder.addCase(fetchMentions.fulfilled, (state, action) => {
      state.mentions.data = action.payload
      state.mentions.isError = false
      state.mentions.isLoading = false
    })
    builder.addCase(fetchMentions.pending, state => {
      state.mentions.isLoading = true
      state.mentions.isError = false
    })
    builder.addCase(fetchMentions.rejected, state => {
      state.mentions.isError = true
      state.mentions.isLoading = false
    })
  },
})

export const {
  // Mention
  addMentionToPost,
  clearMentionSearches,
  removeMentionFromPost,
  // Saved Mention
  removeStoredMention,
  updateStoredMentions,
  // Trend
  addTrendToPost,
  removeTrendFromPost,
  setDefaultHashtags,
  // Post
  setPostText,
  toggleMentionsModal,
  toggleTrendsModal,
} = hashtagSlice.actions

export const { reducer: hashtagReducer } = hashtagSlice
