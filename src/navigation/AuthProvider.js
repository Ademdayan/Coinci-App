import {View, Text} from 'react-native';
import React, {useState, useEffect, createContext} from 'react';
import auth from '@react-native-firebase/auth'


export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
    value={{ 
      user,
      setUser,
      login: async(email, password) => {
        try {
          const result = await auth().signInWithEmailAndPassword(email, password)
          setUser(result.user)
          } catch (error) {
            console.log(error)
            }
      },
      signup: async(email, password) => {
        try {
          const result = await auth().createUserWithEmailAndPassword(email, password)
          setUser(result.user)
          } catch (error) {
            console.log(error)
            }
      },
      resetPassword: async email => {
        try {
          await auth().sendPasswordResetEmail(email);
          alert("Şifre Sıfırlama Linki Mail Adresinize Gönderildi !")
          } catch (error) {
            console.log(error)
            }
      },
      signout: async () => {
        try {
          await auth().signOut();
          setUser(null)
          } catch (error) {
            console.log(error)
            }
      },
    }}>
        {children}
    </AuthContext.Provider>
  );
};
