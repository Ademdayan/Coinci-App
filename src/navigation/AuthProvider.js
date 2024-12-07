import React, {useState, useEffect, createContext} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {async} from 'node-stream-zip';

export const AuthContext = createContext({});
export const AuthProvider = ({children}) => {
  const usersColl = firestore().collection('users');
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth()
              .signInWithEmailAndPassword(email, password)
              .then(async result => {
                if (!result.user.emailVerified) {
                  result.user.sendEmailVerification();
                  alert('Lütfen email adresinize gelen maili onaylayınız...');
                }
              });
          } catch (error) {
            console.log(error);
          }
        },

        signup: async (email, password, name, phone, navigation) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(async result => {
                var uid = result.user.uid;

                result.user.sendEmailVerification();
                result.user.updateProfile({
                  displayName: name,
                });

                await usersColl.doc(uid).set({
                  TRY: 100000,
                  CreatedDate: new Date(),
                  Email: email,
                  Password: password,
                  ImageUrl: '',
                  Name: name,
                  Likes: 0,
                  Views: 0,
                  Phone: phone,
                });

                alert(
                  'Üyelik Oluşturuldu! Lütfen email adresinize gelen maili onaylayınız...',
                );
                navigation.navigate('LoginScreen');
              });
          } catch (error) {
            console.log(error);
          }
        },

        resetPassword: async email => {
          try {
            await auth().sendPasswordResetEmail(email);
            alert('Şifre Sıfırlama Linki Mail Adresinize Gönderildi!');
          } catch (error) {
            alert(error);
          }
        },

        signout: async () => {
          try {
            await auth().signOut();
          } catch (error) {
            console.log(error);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};