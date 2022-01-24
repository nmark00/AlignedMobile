import React, { useState, useEffect }from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from '../firebase/firebaseDB'
import auth from '@react-native-firebase/auth';

import Chats from '../screens/Chats';
import ChatScreen from '../screens/ChatScreen'

const Stack = createStackNavigator();

export default function ChatStack() {

//   const [matches, setMatches] = useState([]);
// 
//   useEffect(() => {
//     const dbRef = firebase.firestore().collection('users').doc(auth().currentUser.uid)
//     dbRef.get().then(res => {
// 
//         const user = res.data();
//         setMatches(user.matches)
// 
//         return user.matches
//     }, () => console.log("Document does not exist!"))
//   });

    

  return (
    <Stack.Navigator initialRouteName="Chats"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name='Chats' component={Chats} />
      <Stack.Screen name='ChatScreen' component={ChatScreen} />
    </Stack.Navigator>
  );
}
