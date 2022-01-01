import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, Button, TextInput, Keyboard } from 'react-native';
import styles from '../styles/Loginstyles'

Keyboard.dismiss()
export default function OTP(props) {
  const [code, setCode] = useState('');

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
