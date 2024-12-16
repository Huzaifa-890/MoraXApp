import React, {  useState } from 'react';
import AuthNavigation from './AuthNavigation';
import UserNavigation from "./UserNavigation"
import { View } from 'react-native';

const RootNavigation = (props) => {
    const [isRole, setIsRole] = useState({
        userRole: 'User',
        isLoggin: true,
    });

    

    return (
        <>
            {
                !isRole.isLoggin ? <AuthNavigation /> : <UserNavigation />
            }
        </>
    );

};

export default RootNavigation;