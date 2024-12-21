import React from 'react';
import RootNavigation from './src/navigation/Rootnavigation';
import {UserProvider} from './src/context/UserContext';

export default function App() {
  return (
    <UserProvider>
      <RootNavigation />
    </UserProvider>
  );
}
