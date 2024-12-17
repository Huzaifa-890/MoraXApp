import React, { useState } from 'react';
import AuthNavigation from './AuthNavigation';
import UserNavigation from './UserNavigation';

const RootNavigation = () => {
    const [authState, setAuthState] = useState({
        userRole: 'User',
        isLoggedIn: false, // Renamed for better clarity
    });

    return authState.isLoggedIn ? <UserNavigation /> : <AuthNavigation />;
};

export default RootNavigation;
