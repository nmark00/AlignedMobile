import React, { useState } from 'react';
import { Text, ScrollView, View, Button, TextInput, Keyboard } from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from '../styles/Loginstyles'

Keyboard.dismiss()
export default function SignupBday(props) {
  function signout() {
    auth().signOut();
    props.navigation.navigate('Landing', {screen: 'LandingComponent'})
  }

  const [bday, setbday] = useState(null);
  return (
    <ScrollView contentContainerStyle={styles.screen}
    keyboardDismissMode={'on-drag'}>
      <Text style={styles.text}>Enter your bday {props.route.params.name}</Text>

      <TextInput autoFocus
        style={styles.inputNumber}
        value={bday}
        onChangeText={setbday}
        textAlign={'center'}
      />

      <Button title="Continue" 
        onPress={() => {
          props.navigation.setParams({ bday: bday });
          props.navigation.navigate('Home');
        }}
        disabled={!bday} />

      <Button title="Signout" onPress={signout} />
    </ScrollView>
  );
}
