import React, {useState} from 'react';
import AuthNavigation from './AuthNavigation';
import UserNavigation from './UserNavigation';
import {useSelector} from 'react-redux';

const RootNavigation = () => {
  const selector = useSelector(state => state?.userData);
  const isLoggin = selector?.isLoggin;

  return isLoggin ? <AuthNavigation /> : <UserNavigation />;
};

export default RootNavigation;
