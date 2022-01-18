import React, { Component } from 'react';
import auth from '@react-native-firebase/auth';

import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';

import SignupName from '../screens/SignupName';
import SignupBday from '../screens/SignupBday';
import SignupPics from '../screens/SignupPics';

const Stack = createStackNavigator();


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      bday: '',
      gender: '',
      sPref: '',
      pics: [],
      isLoading: false
    }
  }
  

  render() {
    return (
      <Stack.Navigator
        initialRouteName="SignupName"
        screenOptions={{gestureEnabled: false}}
        // screenOptions={{headerShown: false}}
      >
        <Stack.Screen
          name="SignupName"
          component={SignupName}
          initialParams={this.state}
          options={ ({navigation, route }) => ({
                      headerLeft: (props) => (
                        <HeaderBackButton 
                          {...props}
                          onPress={()=> {
                            auth().signOut();
                            navigation.navigate('Login')
                          }}/>
                      ),
                      headerBackTitle: "Login"
                    })}
        />
        <Stack.Screen
          name="SignupBday"
          component={SignupBday}
          options={{headerBackTitle: "Name"}}
        />
        <Stack.Screen
          name="SignupPics"
          component={SignupPics}
          options={{headerBackTitle: "Bday"}}
        />
      </Stack.Navigator>
      )
  }

}
export default Signup;