import React from 'react'

import { Text } from 'react-native'

import { useAuthSelector } from '@wsvvrijheid/store'

export const Content = () => {
  const auth = useAuthSelector()

  return <Text>{JSON.stringify(auth)}</Text>
}

export default Content
