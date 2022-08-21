import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Mention, TweetUserData } from '@wsvvrijheid/types'

const LOCAL_STORAGE_MENTIONS_KEY = 'mentions'
const LOCAL_STORAGE_SHARED_POSTS_KEY = 'sharedPosts'

const searchedMentionsStorage: TweetUserData[] =
  typeof window !== 'undefined' &&
  localStorage.getItem(LOCAL_STORAGE_MENTIONS_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_MENTIONS_KEY) as string)
    : []

export const updatePostContent = (state: PostState): void => {
  const twitterCharLimit = 280
  const linkCharCount = 23 + 2 // 2 chars is because of the library leaves spaces before/after the link

  const mentionsStr = state.mentionUsernames.filter(a => !!a).join('\n')

  const trendsStr = [...state.defaultHashtags, ...state.trendNames]
    .filter(a => !!a)
    .join('\n')

  const postContent = [state.postText, mentionsStr, trendsStr]
    .filter(a => !!a)
    .join('\n\n')

  const count = linkCharCount + postContent.length
  const isExceeded = count > twitterCharLimit
  const exceededCharacters =
    count - twitterCharLimit > 0 ? count - twitterCharLimit : 0

  state.count = count
  state.isExceeded = isExceeded
  state.postContent = postContent
  state.threshold = state.postText.length - exceededCharacters
}

export type PostState = {
  count: number
  defaultHashtags: string[]
  defaultTab: number | null
  initialMentions: Mention[]
  isExceeded: boolean
  isMentionListLoading: boolean
  isPostModalOpen: boolean
  isSearchedMentionsLoading: boolean
  isShared: boolean
  mentionUsernames: string[]
  mentions: Mention[]
  postContent: string
  postText: string
  savedMentions: TweetUserData[]
  searchedMentions: TweetUserData[]
  sharedPosts: number[]
  threshold: number
  trendNames: string[]
}

const initialState: PostState = {
  count: 0,
  defaultHashtags: [],
  defaultTab: null,
  initialMentions: [],
  isExceeded: false,
  isMentionListLoading: false,
  isPostModalOpen: false,
  isSearchedMentionsLoading: false,
  isShared: false,
  mentionUsernames: [],
  mentions: [],
  postContent: '',
  postText: '',
  savedMentions: searchedMentionsStorage,
  searchedMentions: [],
  sharedPosts: [],
  threshold: 0,
  trendNames: [],
}

export const fetchSearchedMentions = createAsyncThunk(
  'post/searchedMentions',
  async (value: string) => {
    // return await lookupTwitterUsers(value)
    return value
  },
)

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    // Mention
    addMentionUsername: (state, action: PayloadAction<string>) => {
      state.mentionUsernames.push(`@${action.payload}`)
      updatePostContent(state)
    },
    setRandomMentionUsername: (state, action: PayloadAction<string>) => {
      state.mentionUsernames = [`@${action.payload}`]
      updatePostContent(state)
    },
    clearSearchedMentions: state => {
      state.searchedMentions = []
    },
    removeMentionUsername: (state, action: PayloadAction<string>) => {
      state.mentionUsernames = state.mentionUsernames.filter(
        m => m !== action.payload,
      )
      updatePostContent(state)
    },
    resetMentions: state => {
      state.mentions = state.initialMentions
    },
    setInitialMentions: (state, action: PayloadAction<Mention[]>) => {
      state.initialMentions = action.payload
    },
    setMentions: (state, action: PayloadAction<Mention[]>) => {
      state.mentions = action.payload
    },
    // Saved Mention
    removeSavedMention: (state, action: PayloadAction<string>) => {
      const savedList = state.savedMentions.filter(
        user => user.screen_name !== action.payload,
      )
      localStorage.setItem(
        LOCAL_STORAGE_MENTIONS_KEY,
        JSON.stringify(savedList),
      )
      state.savedMentions = savedList
    },
    updateSavedSearchedMentions: (
      state,
      action: PayloadAction<TweetUserData>,
    ) => {
      state.savedMentions.push(action.payload)
      localStorage.setItem(
        LOCAL_STORAGE_MENTIONS_KEY,
        JSON.stringify(state.savedMentions),
      )
    },
    // Trend
    addTrendName: (state, action: PayloadAction<string>) => {
      state.trendNames.push(action.payload)
      updatePostContent(state)
    },
    removeTrendName: (state, action: PayloadAction<string>) => {
      state.trendNames = state.trendNames.filter(m => m !== action.payload)
      updatePostContent(state)
    },
    // Hashtag
    removeDefaultHashtag: (state, action: PayloadAction<string>) => {
      state.defaultHashtags = state.defaultHashtags.filter(
        m => m !== action.payload,
      )
      updatePostContent(state)
    },
    setDefaultHashtags: (state, action: PayloadAction<string[]>) => {
      state.defaultHashtags = action.payload
      updatePostContent(state)
    },
    // Post
    addSharedPost: (state, action: PayloadAction<number>) => {
      if (state.sharedPosts.includes(action.payload)) return

      state.sharedPosts.push(action.payload)

      localStorage.setItem(
        LOCAL_STORAGE_SHARED_POSTS_KEY,
        JSON.stringify(state.sharedPosts),
      )
    },
    checkSharedPosts: state => {
      const shareStorage = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_SHARED_POSTS_KEY) || '[]',
      )
      state.sharedPosts = shareStorage
    },
    setDefaultTab: (state, action: PayloadAction<number>) => {
      state.defaultTab = action.payload
    },
    setPostContent: (state, action: PayloadAction<string>) => {
      state.postContent = action.payload
      updatePostContent(state)
    },
    setPostText: (state, action: PayloadAction<string>) => {
      state.postText = action.payload
      updatePostContent(state)
    },
    togglePostModal: state => {
      state.isPostModalOpen = !state.isPostModalOpen
    },
  },
  extraReducers: () => {
    // builder.addCase(fetchSearchedMentions.fulfilled, (state, action) => {
    //   state.searchedMentions = action.payload
    //   state.isSearchedMentionsLoading = false
    // }),
    //   builder.addCase(fetchSearchedMentions.pending, state => {
    //     state.isSearchedMentionsLoading = true
    //   }),
    //   builder.addCase(fetchSearchedMentions.rejected, state => {
    //     state.isSearchedMentionsLoading = false
    //   }),
  },
})

export const {
  // Mention
  addMentionUsername,
  setRandomMentionUsername,
  clearSearchedMentions,
  removeMentionUsername,
  resetMentions,
  setInitialMentions,
  setMentions,
  // Saved Mention
  removeSavedMention,
  updateSavedSearchedMentions,
  // Trend
  addTrendName,
  removeTrendName,
  // Hashtag
  removeDefaultHashtag,
  setDefaultHashtags,
  // Post
  addSharedPost,
  checkSharedPosts,
  setDefaultTab,
  setPostContent,
  setPostText,
  togglePostModal,
} = postSlice.actions

export const { reducer: postReducer } = postSlice
