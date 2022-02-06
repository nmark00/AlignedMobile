import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Button, TextInput, Alert, Image, ActivityIndicator, ActionSheetIOS } from 'react-native';
import auth from '@react-native-firebase/auth';
import firebase from '../firebase/firebaseDB';
import styles from '../styles/MarketplaceStyles';
import ButtonBox from '../components/ButtonBox';

export default function Marketplace(props) {

  const packPrice = 10;
  
  const [profileIsReady, setProfileIsReady] = useState(false);
  const [coins, setCoins] = useState();
  const [numPacks, setNumPacks] = useState();

  const ref = firebase.firestore().collection('users').doc(auth().currentUser.uid);

  useEffect(() => {
    ref.get().then(res => {
      if (res.exists) {
        const user = res.data();
        setCoins(user.coins);
        setNumPacks(user.numPacks);
      } else {
        console.log("Document does not exist!");
      }
    });
  })
  
  if (profileIsReady) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E"/>
      </View>
      )
  }

  function navOpenPacks() {
    props.navigation.navigate('OpenPacksScreen');
  }
  function navAuctionSell() {
    props.navigation.navigate('AuctionSell');
  }
  function navAuctionBuy() {
    props.navigation.navigate('AuctionBuy');
  }
  
  function updateCoins(amt=1) {
    ref.update({ coins: coins + amt });
    setCoins(coins + amt);
  }
  
  function buyPacks(amt=1) {
    ref.update({ coins: coins - packPrice, numPacks: numPacks + amt });
    setNumPacks(numPacks + amt);
  }

  function alertNotEnoughCoins() {
    Alert.alert("Not Enough Coins!");
  }

  function alertNotEnoughPacks() {
    Alert.alert("No More Packs!");
  }  

  return (
    <View>

      {/* My Coins Box */}
      <View style={styles.box}>
        <Text style={styles.title}>My Coins</Text>
        <View style={styles.fieldRow}>
          <Text style={styles.subTitle}>{coins}¢</Text>
          <View style={{marginTop: -30}}>
          <ButtonBox
          width={45}
          height={45}
          color={'#ab6be3'}
          text={"+"}
          action={() => updateCoins()}
          />  
          </View> 
        </View> 
      </View> 
      
      {/* Auction Box */}
      <View style={styles.box}>
        <Text style={styles.title}>Auction</Text>
        <View style={{...styles.fieldRow, marginTop: 10}}>
          <ButtonBox 
          width={150}
          height={50}
          color={'#ab6be3'}
          text={"Buy"}
          action={navAuctionBuy}
          />
          <ButtonBox 
          width={150}
          height={50}
          color={'#ab6be3'}
          text={"Sell"}
          action={navAuctionSell}
          />
        </View>
      </View>

      {/* My Packs Box */}
      <View style={styles.box}>
        <Text style={styles.title}>My Packs</Text>
        <View style={styles.fieldRow}>
          <Text style={styles.subTitle}>{numPacks} Packs</Text>
          <View style={{marginTop: -30}}>
          { coins >= packPrice ? 
            <ButtonBox
            width={55}
            height={45}
            color={'#ab6be3'}
            text={packPrice+"¢"}
            action={() => buyPacks()}
            /> :
            <ButtonBox
            width={55}
            height={45}
            color={'#a1a1a1'}
            text={packPrice+"¢"}
            action={alertNotEnoughCoins}
            />
          }
          </View>
        </View>
        <View style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
        { numPacks > 0 ?
          <ButtonBox 
          width={150}
          height={50}
          color={'#ab6be3'}
          text={"Open Pack"}
          action={navOpenPacks}
          /> : 
          <ButtonBox 
          width={150}
          height={50}
          color={'#a1a1a1'}
          text={"Open Pack"}
          action={alertNotEnoughPacks}
          />
        }
        </View>
      </View>

    </View>
  );
}
