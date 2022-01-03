import React, { useState, useRef } from 'react';
import { Text, ScrollView, View, Button, TextInput, Keyboard, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from '../styles/Loginstyles';

Keyboard.dismiss()
export default function SignupBday(props) {
  function signout() {
    auth().signOut();
    props.navigation.navigate('Landing', {screen: 'LandingComponent'})
  }

  const [bday, setbday] = useState('mmyy');
  const refM1 = useRef();
  const refM2 = useRef();
  const refY1 = useRef();
  const refY2 = useRef();
  const [profileIsReady, setProfileIsReady] = useState(false);
  const [m1, setM1] = useState()
  const [m2, setM2] = useState()
  const [y1, setY1] = useState()
  const [y2, setY2] = useState()

  function replaceAt(i, c) {
    setbday(bday.substr(0, i) + c + bday.substr(i+1));
    props.navigation.setParams({bday: bday.substr(0, i) + c + bday.substr(i+1)});
  }

  if (profileIsReady) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E"/>
      </View>
      )
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}
    keyboardDismissMode={'on-drag'}>
      <Text style={styles.text}>Enter your bday {props.route.params.name}</Text>

      <Text style={styles.text}>local: {bday} | param: {props.route.params.bday}</Text>
      <View style={{paddingBottom: 50}}></View>

      <View style={styles.fieldRow}>
        <TextInput
          value={m1}
          maxLength={1}
          placeholder='m'
          placeholderTextColor='gray'
          style={styles.digit}
          ref={refM1}
          keyboardType="numeric"
          onKeyPress={({ nativeEvent })=> {
            if (nativeEvent.key === 'Backspace') {
              refY2.current.focus();
              setM1('');
              replaceAt(0, 'm');
            } else {
              refM2.current.focus();
              setM1(nativeEvent.key);
              replaceAt(0,nativeEvent.key);
            }
          }}
        />
        <TextInput
          value={m2}
          maxLength={1}
          placeholder='m'
          placeholderTextColor='gray'
          style={styles.digit}
          ref={refM2}
          keyboardType="numeric"
          onKeyPress={({nativeEvent})=> {
            if (nativeEvent.key === 'Backspace') {
              refM1.current.focus();
              setM2('')
              replaceAt(1, 'm');
            } else {
              refY1.current.focus();
              setM2(nativeEvent.key);
              replaceAt(1,nativeEvent.key);
            }
          }}
        />
        <Text style={styles.text}>/</Text>
        <TextInput
          value={y1}
          maxLength={1}
          placeholder='y'
          placeholderTextColor='gray'
          style={styles.digit}
          ref={refY1}
          keyboardType="numeric"
          onKeyPress={({nativeEvent})=> {
            if (nativeEvent.key === 'Backspace') {
              refM2.current.focus();
              setY1('')
              replaceAt(2, 'y');
            } else {
              refY2.current.focus();
              setY1(nativeEvent.key);
              replaceAt(2,nativeEvent.key);
            }
          }}
        />
        <TextInput
          value={y2}
          maxLength={1}
          placeholder='y'
          placeholderTextColor='gray'
          style={styles.digit}
          ref={refY2}
          keyboardType="numeric"
          onKeyPress={({nativeEvent})=> {
            if (nativeEvent.key === 'Backspace') {
              refY1.current.focus();
              setY2('')
              replaceAt(3, 'y');
            } else {
              refM1.current.focus();
              setY2(nativeEvent.key);
              replaceAt(3,nativeEvent.key);
            }
          }}
        />
      </View>


      <Button title="Continue" 
        onPress={() => {
          setProfileIsReady(true);
          props.navigation.navigate('SignupPics', props.route.params);
        }}
        disabled={!m1 || !m2 || !y1 || !y2 || isNaN(bday)} />

      <Button title="Signout" onPress={signout} />
    </ScrollView>
  );
}
