import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Button, TextInput, Keyboard, Image, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from '../styles/Loginstyles'
import ChoosePic from './ChoosePic'

Keyboard.dismiss()
export default function SignupName(props) {
  function signout() {
    auth().signOut();
    props.navigation.navigate('Landing', {screen: 'LandingComponent'})
  }

  function updateParam(i, url) {
    let pics = props.route.params.pics;
    pics[i] = url;
    props.navigation.setParams({pics: pics})
  }

  const [uri1, setp1] = useState();
  const [uri2, setp2] = useState();
  const [uri3, setp3] = useState();
  const [profileIsReady, setProfileIsReady] = useState(false);
  if (profileIsReady) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E"/>
      </View>
      )
  }

  return (
    <View>
    <Text style={styles.text}>Select Pictures</Text>
    <View style={styles.fieldRow}>
      <ChoosePic getImage={url => {setp1(url); updateParam(0, url); }}/>
      <ChoosePic getImage={url => {setp2(url); updateParam(1, url); }}/>
      <ChoosePic getImage={url => {setp3(url); updateParam(2, url); }}/>
    </View>
    <Button title="Continue" 
        onPress={() => {
          setProfileIsReady(true);
          props.navigation.navigate('Home', props.route.params);
        }}
        disabled={ !uri1 && !uri2 && !uri3 } />

    <Button title="Signout" onPress={signout} />
    </View>
  );
}
