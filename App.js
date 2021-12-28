import * as React from 'react';
import { View, Text, StyleSheet, FlatList,Alert } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import auth from '@react-native-firebase/auth';

import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Logout from './src/screens/Logout';
import VerifyCode from './src/screens/VerifyCode'


const Stack = createStackNavigator();


export default function App() {
  const [confirm, setConfirm] = React.useState(null);
  const [authenticated, setAuthenticated] = React.useState(false);

  async function signIn(phoneNumber) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      alert(error)
    }
  }

  async function confirmVerificationCode(code) {
    try {
      await confirm.confirm(code);
      setConfirm(null);
    } catch (error) {
      alert('Invalid code');
    }
  }

  auth().onAuthStateChanged(user => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  })

  if (authenticated) {
    return <Logout/>
  }

  if (confirm) return <VerifyCode onSubmit={confirmVerificationCode}/>;

  return <Login onSubmit={signIn}/>
}


