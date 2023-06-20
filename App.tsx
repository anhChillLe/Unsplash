import { Center, NativeBaseProvider, Text } from 'native-base';
import React from 'react';

export default function App() {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Text fontSize='xl'>Hello world!</Text>
      </Center>
    </NativeBaseProvider>
  )
}