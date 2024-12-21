import React, {createContext, useContext, useState} from 'react';

const UserContext = createContext(undefined);

export const UserProvider = ({children}) => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <UserContext.Provider value={{isLogin, setIsLogin}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
