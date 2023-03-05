import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API_URL, TOKEN } from '@wsvvrijheid/config'
import { Mention, StrapiLocale } from '@wsvvrijheid/types'
import axios from 'axios'
import { UserV1 } from 'twitter-api-v2'

const LOCAL_STORAGE_MENTIONS_KEY = 'mentions'
const LOCAL_STORAGE_SHARED_POSTS_KEY = 'sharedPosts'
const TWITTER_CHAR_LIMIT = 280
const TWITTER_LINK_CHAR_COUNT = 23 + 2 // 2 chars is because of the library leaves spaces before/after the link
const availableCount = TWITTER_CHAR_LIMIT - TWITTER_LINK_CHAR_COUNT

const searchedMentionsStorage: UserV1[] = []
// typeof window !== 'undefined' &&
// localStorage.getItem(LOCAL_STORAGE_MENTIONS_KEY)
//   ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_MENTIONS_KEY) as string)
//   : []

export const updatePostContent = (state: PostState): void => {
  const mentionsStr = state.mentionUsernames.filter(a => !!a).join('\n')

  const trendsStr = [...state.defaultHashtags, ...state.trendNames]
    .filter(a => !!a)
    .join('\n')

  const defaultCount =
    TWITTER_LINK_CHAR_COUNT +
    [mentionsStr, trendsStr].filter(a => !!a).join('\n\n').length

  const postContent = [state.postText, mentionsStr, trendsStr]
    .filter(a => !!a)
    .join('\n\n')

  const count = TWITTER_LINK_CHAR_COUNT + postContent.length
  const isExceeded = count > TWITTER_CHAR_LIMIT
  const exceededCharacters =
    count - TWITTER_CHAR_LIMIT > 0 ? count - TWITTER_CHAR_LIMIT : 0

  state.count = count
  state.isExceeded = isExceeded
  state.postContent = postContent
  state.threshold = state.postText.length - exceededCharacters
  state.availableCount = TWITTER_CHAR_LIMIT - defaultCount
}

export type PostState = {
  availableCount: number
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
  savedMentions: UserV1[]
  searchedMentions: UserV1[]
  sharedPosts: number[]
  threshold: number
  trendNames: string[]
}

const initialState: PostState = {
  availableCount,
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
    const response = await axios(`${API_URL}/api/mentions/search?q=${value}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
    const rawData = response.data as UserV1[]

    return rawData.sort((a, b) => b.followers_count - a.followers_count)
  },
)
//?locale=${locale}&filters[hashtags][slug][$eqi]=${slug}
export const fetchMentions = createAsyncThunk(
  'post/mentions',

  async (payload: {
    locale: StrapiLocale
    slug: string
  }): Promise<Mention[]> => {
    const response = await axios(
      `${API_URL}/api/mentions?locale=${payload?.locale}&filters[hashtags][slug][$eq]=${payload?.slug}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    )
    const rawData = response.data

    return rawData.data as Mention[]
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
    updateSavedSearchedMentions: (state, action: PayloadAction<UserV1>) => {
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
  extraReducers: builder => {
    builder.addCase(fetchSearchedMentions.fulfilled, (state, action) => {
      state.searchedMentions = action.payload
      state.isSearchedMentionsLoading = false
    })
    builder.addCase(fetchSearchedMentions.pending, state => {
      state.isSearchedMentionsLoading = true
    })
    builder.addCase(fetchSearchedMentions.rejected, state => {
      state.isSearchedMentionsLoading = false
    })
    builder.addCase(fetchMentions.fulfilled, (state, action) => {
      state.initialMentions = action.payload
      state.mentions = action.payload
      state.isMentionListLoading = false
    })
    builder.addCase(fetchMentions.pending, state => {
      state.isMentionListLoading = true
    })
    builder.addCase(fetchMentions.rejected, state => {
      state.isMentionListLoading = false
    })
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
