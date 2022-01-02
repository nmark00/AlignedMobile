import React, { useState } from 'react';
import { Text, ScrollView, View, Button, TextInput, Keyboard } from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from '../styles/Loginstyles'

Keyboard.dismiss()
export default function SignupName(props) {
  function signout() {
    auth().signOut();
    props.navigation.navigate('Landing', {screen: 'LandingComponent'})
  }

  const [name, setName] = useState(null);
  return (
    <ScrollView contentContainerStyle={styles.screen}
    keyboardDismissMode={'on-drag'}>
      <Text style={styles.text}>Enter your name {props.route.params.name} </Text>

      <TextInput autoFocus
        style={styles.inputNumber}
        value={name}
        onChangeText={(name) => {setName(name); props.navigation.setParams({name: name}); }}
        textAlign={'center'}
      />

      <Button title="Continue" 
        onPress={() => {
          props.navigation.navigate('SignupBday', props.route.params);

        }}
        disabled={!name} />

      <Button title="Signout" onPress={signout} />
    </ScrollView>
  );
}
