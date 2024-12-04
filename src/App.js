import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {AuthProvider} from './navigation/AuthProvider'
import Routes from './navigation/Routes'

const App = () => {
  return (
    <AuthProvider>

    <Routes/>

    </AuthProvider>
  )
}

export default App

