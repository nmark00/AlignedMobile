import React from 'react';
import auth from '@react-native-firebase/auth';

import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';

import MarketplaceScreen from './MarketplaceScreen';
import OpenPacksScreen from './OpenPacksScreen';
import PacksStore from './PacksStore';
import Auction from './Auction';

const Stack = createStackNavigator();


export default function MarketNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MarketplaceScreen"
      screenOptions={{gestureEnabled: false, headerShown: false}}
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
        name="MarketplaceScreen"
        component={MarketplaceScreen}
        options={{headerLeft: props => null }}
      />

    </Stack.Navigator>
    )
}
