import React, { useState } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../styles/Loginstyles'

export default function Login(props) {

  const [phoneNumber, setPhoneNumber] = useState(null);

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Enter Phone Number</Text>
      <TextInput
        autoFocus
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Phone Number Sign In" onPress={() => props.onSubmit(phoneNumber)} />
    </View>
  );
}
