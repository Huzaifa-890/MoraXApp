import React, {useState} from 'react';
import AuthNavigation from './AuthNavigation';
import UserNavigation from './UserNavigation';
import {useUser} from '../context/UserContext';

const RootNavigation = () => {
  const [authState, setAuthState] = useState({
    userRole: 'User',
    isLoggedIn: false, // Renamed for better clarity
  });
  const {isLogin} = useUser();

  return isLogin ? <UserNavigation /> : <AuthNavigation />;
};

export default RootNavigation;
