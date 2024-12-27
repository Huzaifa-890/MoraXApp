import React from 'react';
import RootNavigation from './src/navigation/Rootnavigation';
import {UserProvider} from './src/context/UserContext';
import {Provider} from 'react-redux';
import store from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <UserProvider>
        <RootNavigation />
      </UserProvider>
    </Provider>
  );
}
