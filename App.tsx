import React from 'react';
import Navigation from './src/components/common/Navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/state/store';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <GestureHandlerRootView>
          <Navigation />
        </GestureHandlerRootView>
      </Provider>
    </>
  )
};

export default App;