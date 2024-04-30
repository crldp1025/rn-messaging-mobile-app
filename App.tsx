import React from 'react';
import Navigation from './src/components/common/Navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <>
      <GestureHandlerRootView>
        <Navigation />
      </GestureHandlerRootView>
    </>
  )
};

export default App;