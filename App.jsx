import React from 'react';
import RootNavigation from './src/navigation/Rootnavigation';
import {Provider} from 'react-redux';
import store from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
