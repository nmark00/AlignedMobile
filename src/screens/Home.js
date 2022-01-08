import * as React from 'react';
import { View, Text, StyleSheet, FlatList,Alert } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from './HomeScreen';
import Chats from './Chats';
import UserDetailScreen from './UserDetailScreen';
import Logout from './Logout';

import styles from '../styles/tabBarStyles'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


export default function Home(props) {
  // console.log(props.route.params.pics.filter(n=>n))
  // console.log(props.route.params.name)
	return (
    <Stack.Navigator
    screenOptions={{gestureEnabled: false, headerShown: false}}>
    <Stack.Screen name="Tab">
      {props => 
              <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === 'Logout') {
                    iconName = 'store';
                  } else if (route.name === 'HomeScreen') {
                    iconName = 'home';
                  } else if (route.name === 'Chats') {
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
                tabBarStyle: styles.tabBar,
                headerStyle: {
                  backgroundColor: '#621FF7',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                // gestureEnabled: false
              })}
            >
            <Tab.Screen 
              name="Logout" 
              component={Logout} 
              options={{ title: 'Logout' }}
            />
            <Tab.Screen 
              name="HomeScreen" 
              component={HomeScreen} 
              options={{ title: 'Home' }}
            />
            <Tab.Screen 
              name="Chats" 
              component={Chats} 
              options={{ title: 'Chats' }}
            />
          </Tab.Navigator> }
    </Stack.Screen>

    <Stack.Screen 
     name="UserDetailScreen" 
     component={UserDetailScreen} 
     options={ ({ navigation, route }) => ({
                      headerLeft: (props) => (
                        <HeaderBackButton 
                          {...props}
                          onPress={()=> {
                            navigation.navigate('Tab')
                          }}/>
                      ),
                      headerBackTitle: "Chats",
                      headerShown: true,

                    })
              }
    />
  </Stack.Navigator>
  );
}