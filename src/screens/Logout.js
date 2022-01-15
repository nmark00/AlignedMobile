import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import firebase from '../firebase/firebaseDB';

export default function Authenticated(props) {

  function signout() {
    auth().signOut();
    props.navigation.navigate('Landing', {screen: 'LandingComponent'})
  }

  function getUsers(forbiddenUsers) {
    firebase.firestore().collection('users')
    .where(firebase.firestore.FieldPath.documentId(), 'not-in', forbiddenUsers)
    .limit(8)
    .get()
    .then(querySnapshot => {
      console.log(querySnapshot.docs[0].id);
      console.log(querySnapshot.size);
    });
  }
  getUsers([auth().currentUser.uid]);

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>You're Logged in</Text>
      <Text style={styles.phoneNumber}>{auth().currentUser.phoneNumber}</Text>
      <Text style={styles.phoneNumber}>{auth().currentUser.uid}</Text>

      <View style={{ marginTop: 30 }}>
        <Button title="Signout" onPress={signout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: 'lightblue',
    width: 300,
    marginVertical: 30,
    fontSize: 25,
    padding: 10,
    borderRadius: 8,
  },
  text: {
    fontSize: 25,
  },
  phoneNumber: {
    fontSize: 21,
    marginTop: 20,
  },
});