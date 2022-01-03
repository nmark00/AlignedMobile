import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Button, TextInput, Keyboard, Image, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import firebase from '../firebase/firebaseDB'
import styles from '../styles/Loginstyles'
import ChoosePic from './ChoosePic'
import storage from '@react-native-firebase/storage'
import uuid from 'react-native-uuid'

Keyboard.dismiss()
export default function SignupName(props) {
  function signout() {
    auth().signOut();
    props.navigation.navigate('Landing', {screen: 'LandingComponent'})
  }

  function updateParam(i, url) {
    let updatedPics = pics;
    updatedPics[i] = url;
    setPics(updatedPics);
  }
  
  async function uploadParams() {
    setProfileIsReady(true);
    const uid = auth().currentUser.uid;
    const params = props.route.params

    let ref;
    let url;
    for (const uri of pics.filter(n=>n)) {
      ref = storage().ref(`users/${uid}/${uuid.v4()}`);
      await ref.putFile(uri);
      url = await ref.getDownloadURL();
      params.pics.push(url)
    }
    await firebase.firestore().collection('users').doc(uid).set(params)
    props.navigation.navigate('Home', params)
  }

  const [uri1, setp1] = useState();
  const [uri2, setp2] = useState();
  const [uri3, setp3] = useState();
  const [pics, setPics] = useState(Array(6));
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
        onPress={uploadParams}
        disabled={ !uri1 && !uri2 && !uri3 } />

    <Button title="Signout" onPress={signout} />
    </View>
  );
}
