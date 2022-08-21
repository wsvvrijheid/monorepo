import { MENTION_MOCKS } from '@wsvvrijheid/mocks'
import {
  addMentionUsername,
  setInitialMentions,
  store,
} from '@wsvvrijheid/utils'

// TODO: Add Manual store configuration with preloaded state
store.dispatch(setInitialMentions(MENTION_MOCKS.data))
store.dispatch(addMentionUsername('wsvvrijheid'))
store.dispatch(addMentionUsername('samenvvv'))

export { store }
export { mockWorker } from '@wsvvrijheid/mocks'
export { themes } from '@wsvvrijheid/config'
