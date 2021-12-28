import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import styles from '../styles/Loginstyles'

export default function OTP(props) {
  const [code, setCode] = useState('');

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Enter OTP</Text>
      <TextInput
        autoFocus
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Confirm OTP" onPress={() => props.onSubmit(code)} />
    </View>
  );
}
