import React from 'react'

import { useAuthSelector } from '@wsvvrijheid/store'
import { Text } from 'react-native'

export const Content = () => {
  const auth = useAuthSelector()

  return <Text>{JSON.stringify(auth)}</Text>
}

export default Content
