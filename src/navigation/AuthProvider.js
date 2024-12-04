import {View, Text} from 'react-native';
import React, {useState, useEffect, createContext} from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [User, setUser] = useState(null);
  return (
    <AuthContext.Provider>
        {children}
    </AuthContext.Provider>
  );
};
