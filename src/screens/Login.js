import React, { useState, Component } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import LoginComponent from '../components/LoginComponent'
import VerifyCode from '../components/VerifyCode'

export default function Login(props) {

  const [confirm, setConfirm] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

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
    return <View>{props.navigation.navigate('Home')}</View>
  }

  if (confirm) return <VerifyCode onSubmit={confirmVerificationCode}/>;

  return <LoginComponent onSubmit={signIn}/>

}
