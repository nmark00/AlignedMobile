import * as React from 'react';
import { View, Text, StyleSheet, FlatList,Alert } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import AddUserScreen from './AddUserScreen';
import UserScreen from './UserScreen';
import UserDetailScreen from './UserDetailScreen';
import Logout from './Logout';

const Tab = createBottomTabNavigator();

export default function Home() {
	return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Logout') {
              iconName = 'store';
            } else if (route.name === 'AddUserScreen') {
              iconName = 'home';
            } else if (route.name === 'UserScreen') {
              iconName = 'comments';
            } else if (route.name === 'UserDetailScreen') {
              iconName = 'user';
            } else {
              iconName = 'chart-pie;'
            }
            return <FontAwesome5 name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: '#621FF7',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
      <Tab.Screen 
        name="Logout" 
        component={Logout} 
        options={{ title: 'Logout' }}
      />
      <Tab.Screen 
        name="AddUserScreen" 
        component={AddUserScreen} 
        options={{ title: 'Add User' }}
      />
      <Tab.Screen 
        name="UserScreen" 
        component={UserScreen} 
        options={{ title: 'Users List' }}
      />
      <Tab.Screen 
       name="UserDetailScreen" 
       component={UserDetailScreen} 
       options={{ title: 'User Detail' }}
      />
    </Tab.Navigator>
    );
}