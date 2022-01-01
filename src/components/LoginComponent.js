import React, { useState } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../styles/Loginstyles'
import { CallingCodePicker } from '@digieggs/rn-country-code-picker';

export default function Login(props) {

  const [phoneNumber, setPhoneNumber] = useState(null);
  const [selectedCallingCode, setSelectedCallingCode] = useState('1');
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Enter Phone Number</Text>
      <CallingCodePicker selectedValue={selectedCallingCode}
      onValueChange={value => setSelectedCallingCode(value)}/>
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
