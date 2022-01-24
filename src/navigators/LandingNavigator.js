import React from 'react';
import auth from '@react-native-firebase/auth';

import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';

import Login from '../screens/Login';
import LandingScreen from '../screens/LandingScreen';
import Signup from '../navigators/SignupNavigator';

const Stack = createStackNavigator();


export default function Landing() {
  return (
    <Stack.Navigator
      initialRouteName="LandingScreen"
      screenOptions={{gestureEnabled: false}}
    >
      <Stack.Screen
        name="LandingScreen"
        component={LandingScreen}
        options={{headerLeft: props => null }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={ ({navigation, route }) => ({
                    headerLeft: (props) => (
                      <HeaderBackButton 
                        {...props}
                        onPress={()=> {
                          auth().signOut();
                          navigation.navigate('Login')
                        }}/>
                    ),
                    headerBackTitle: "Login",
                    headerShown: false
                  })}
      />
      <Stack.Screen
        name="Login"
        component={Login}
      />

    </Stack.Navigator>
    )
}
