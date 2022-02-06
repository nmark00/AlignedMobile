import React from 'react';
import auth from '@react-native-firebase/auth';

import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';

import MarketplaceScreen from '../screens/MarketplaceScreen';
import OpenPacksScreen from '../screens/OpenPacksScreen';
import PacksStore from '../screens/PacksStore';
import Auction from '../screens/Auction';
import AuctionSell from '../screens/AuctionSellScreen';
import AuctionBuy from '../screens/AuctionBuyScreen';

const Stack = createStackNavigator();


export default function MarketNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MarketplaceScreen"
      screenOptions={{gestureEnabled: false, headerShown: true, 
        headerStyle: {
          backgroundColor: '#621FF7',
        },headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="OpenPacksScreen"
        component={OpenPacksScreen}
      />
      <Stack.Screen
        name="PacksStore"
        component={PacksStore}
      />
      <Stack.Screen
        name="Auction"
        component={Auction}
      />
      <Stack.Screen
        name="AuctionBuy"
        component={AuctionBuy}
      />
      <Stack.Screen
        name="AuctionSell"
        component={AuctionSell}
      />
      <Stack.Screen
        name="MarketplaceScreen"
        component={MarketplaceScreen}
        options={{headerLeft: props => null }}
      />

    </Stack.Navigator>
    )
}
