import React from 'react';
import auth from '@react-native-firebase/auth';

import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';

import Login from '../screens/Login';
import LandingComponent from '../components/LandingComponent';
import Signup from '../screens/Signup';

const Stack = createStackNavigator();


export default function Landing() {
  return (
    <Stack.Navigator
      initialRouteName="LandingComponent"
      screenOptions={{gestureEnabled: false}}
    >
      <Stack.Screen
        name="LandingComponent"
        component={LandingComponent}
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
