import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from '../screens/HomeScreen';
// import ChatNavigator from '../screens/ChatNavigator';
import ChatNavigator from './ChatNavigator';
import EditProfile from '../screens/EditProfileScreen';
import MarketplaceNavigator from './MarketNavigator'
import Stats from '../screens/StatsScreen';

import styles from '../styles/tabBarStyles'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


export default function HomeNavigator(props) {
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
      
                  if (route.name === 'HomeScreen') {
                    iconName = 'user';
                  } else if (route.name === 'ChatNavigator') {
                    iconName = 'comments';
                  } else if (route.name === 'EditProfile') {
                    iconName = 'user';
                  } else if (route.name === 'Market') {
                    iconName = 'store';
                  } else if (route.name === 'Stats'){
                    iconName = 'chart-pie'
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
              name="Stats" 
              component={Stats} 
              options={{ title: 'Stats' }}
            />
            <Tab.Screen 
              name="Market" 
              component={MarketplaceNavigator} 
              options={{ title: 'Market', headerShown: false }}
            />
            <Tab.Screen 
              name="ChatNavigator" 
              component={ChatNavigator} 
              options={{ title: 'Chats', lazy: false }}
            />
            <Tab.Screen 
              name="HomeScreen" 
              component={HomeScreen} 
              options={{ title: 'Account', lazy: false }}
            />
          </Tab.Navigator> }
    </Stack.Screen>

    <Stack.Screen 
     name="EditProfileScreen" 
     component={EditProfile} 
     options={ ({ navigation, route }) => ({
                      headerLeft: (props) => (
                        <HeaderBackButton 
                          {...props}
                          onPress={()=> {
                            navigation.navigate('Tab')
                          }}/>
                      ),
                      headerBackTitle: "Back",
                      headerShown: true,

                    })
              }
    />
  </Stack.Navigator>
  );
}