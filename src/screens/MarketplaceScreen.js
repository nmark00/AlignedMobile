import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Button, TextInput, Keyboard, Image, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import firebase from '../firebase/firebaseDB'
import styles from '../styles/Loginstyles'

export default function Marketplace(props) {
  
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
    <Text style={styles.text}>Open Packs</Text>
    <Button title="Open Now" onPress={() => props.navigation.navigate('OpenPacksScreen')} />
    
    <View style={styles.fieldRow}>
      <Button title="Packs Store" onPress={() => props.navigation.navigate('PacksStore')} />
      <Button title="Auction" onPress={() => props.navigation.navigate('Auction')} />
    </View>

    </View>
  );
}
