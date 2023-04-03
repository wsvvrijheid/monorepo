/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useRef } from 'react'

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Provider } from 'react-redux'

import { store } from '@wsvvrijheid/store'

import Content from './Content'

// TODO: Add tanstack query https://codesandbox.io/s/github/tanstack/query/tree/main/examples/react/react-native?from-embed
export const App = () => {
  const scrollViewRef = useRef<null | ScrollView>(null)

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          ref={ref => {
            scrollViewRef.current = ref
          }}
          contentInsetAdjustmentBehavior="automatic"
        >
          <View>
            <TouchableOpacity>
              <View>
                <Text>Post Maker</Text>
                <Content />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  )
}

export default App
