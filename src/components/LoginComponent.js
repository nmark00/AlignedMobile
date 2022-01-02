import React, { useState } from 'react';
import { Text, ScrollView, View, Button, TextInput, Keyboard } from 'react-native';
import styles from '../styles/Loginstyles'
import { CallingCodePicker } from '@digieggs/rn-country-code-picker';
import { TextInputMask } from 'react-native-masked-text'

Keyboard.dismiss()
export default function Login(props) {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [selectedCallingCode, setSelectedCallingCode] = useState('1');
  return (
    <ScrollView contentContainerStyle={styles.screen}
    keyboardDismissMode={'on-drag'}>
      <Text style={styles.text}>Enter Phone Number</Text>

      <View style={styles.fieldRow}>
        <CallingCodePicker selectedValue={selectedCallingCode}
          onValueChange={value => setSelectedCallingCode(value)}
          style={styles.codePicker}
        />
        <TextInputMask 
          style={styles.inputNumber}
          maxLength={12}
          type={'custom'}
          keyboardType='numeric'
          options={{mask: '999 999 9999'}}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
      <Button title="Phone Number Sign In" 
        onPress={() => props.onSubmit(selectedCallingCode, phoneNumber)}
        disabled={!phoneNumber} />
    </ScrollView>
  );
}
