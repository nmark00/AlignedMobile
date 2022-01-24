import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Chats from '../screens/Chats';
import ChatScreen from '../screens/ChatScreen'

const Stack = createStackNavigator();

export default function ChatStack() {
  return (
    <Stack.Navigator initialRouteName="Chats"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name='Chats' component={Chats} />
      <Stack.Screen name='ChatScreen' component={ChatScreen} />
    </Stack.Navigator>
  );
}
