import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, Button, TextInput, Keyboard, ActivityIndicator } from 'react-native';
import styles from '../styles/Loginstyles'

Keyboard.dismiss()
export default function OTP(props) {
  const [code, setCode] = useState('');

  if (code.length == 6) {
    <ActivityIndicator size="large" color="#9E9E9E"/>
    {props.onSubmit(code)}
  }
  return (
    <ScrollView contentContainerStyle={styles.screen}
    keyboardDismissMode={'on-drag'}>
      <Text style={styles.text}>Enter OTP</Text>
      <TextInput
        autoFocus
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Confirm OTP" onPress={() => props.onSubmit(code)} />
    </ScrollView>
  );
}
