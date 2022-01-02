import React, { Component } from 'react';
import auth from '@react-native-firebase/auth';

import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';

import SignupName from '../components/SignupName';
import SignupBday from '../components/SignupBday';

const Stack = createStackNavigator();

export default function Signup() {
  return (
    <Stack.Navigator
        initialRouteName="SignupName"
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen
          name="SignupName"
          component={SignupName}
        />
        <Stack.Screen
          name="SignupBday"
          component={SignupBday}
        />
      </Stack.Navigator>
    )
}

// 
// class Signup extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: '',
//       bday: '',
//       gender: '',
//       sPref: '',
//       isLoading: false
//     }
//   }
//   
// 
//   render() {
//     return (
//       <Stack.Navigator
//         initialRouteName="SignupName"
//         screenOptions={{headerShown: false}}
//       >
//         <Stack.Screen
//           name="SignupName"
//           component={SignupName}
//           options={{
//             headerLeft: (props) => (
//               <HeaderBackButton 
//                 {...props}
//                 onPress={()=> {
//                   auth().signOut();
//                   props.navigation.navigate('Login')
//                 }}/>
//             ),
//             headerBackTitle: "Landing"
//           }}
//         />
//         <Stack.Screen
//           name="SignupBday"
//           component={SignupBday}
//         />
//       </Stack.Navigator>
//       )
//   }
// 
// }
// export default Signup;