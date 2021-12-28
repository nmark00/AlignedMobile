import React, { useState, Component } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import LoginComponent from '../components/LoginComponent'
import VerifyCode from '../components/VerifyCode'

// 
// class Login extends Component {
//   constructor() {
//     super();
//     this.state = {
//       confirm: null,
//       authenticated: false,
//       isLoading: true
//     }
//   }
// 
//   signIn = async (phoneNumber) => {
//     try {
//       const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//       this.setState({ confirm: confirmation });
//     } catch (error) {
//       alert(error)
//     }
//   }
// 
//   confirmVerificationCode = async (code) => {
//     try {
//       await confirm.confirm(code);
//       this.setState({ confirm: null });
//     } catch (error) {
//       alert('Invalid code');
//     }
//   }
// 
//   componentDidMount() {
//     this.unsubscribe = auth().onAuthStateChanged(user => {
//       if (user) {
//         this.setState({ 
//           authenticated: true,
//           isLoading: false
//         });
//       } else {
//         this.setState({ authenticated: false });
//       }
//     });
//   }
//   componentWillUnmount() {
//     if (this.unsubscribe) this.unsubscribe();
//   }
// 
//   render() {
//     if (this.authenticated) {
// 
//       if (this.state.isLoading) {
//         return (
//           <View style={styles.preloader}>
//             <ActivityIndicator size="large" color="#9E9E9E"/>
//           </View>
//           )
//       }
//       
//       {this.props.navigation.navigate('Home')}
//     }
//     
//     else if (this.confirm) return <VerifyCode onSubmit={this.confirmVerificationCode}/>;
// 
//     else
//       return <LoginComponent onSubmit={this.signIn}/>
//   }
// 
// }
// 
// export default Login;


export default function Login(props) {

  const [confirm, setConfirm] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  async function signIn(phoneNumber) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      alert(error)
    }
  }

  async function confirmVerificationCode(code) {
    try {
      await confirm.confirm(code);
      setConfirm(null);
    } catch (error) {
      alert('Invalid code');
    }
  }

  auth().onAuthStateChanged(user => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  })

  if (authenticated) {
    return <View>{props.navigation.navigate('Home')}</View>
  }

  if (confirm) return <VerifyCode onSubmit={confirmVerificationCode}/>;

  return <LoginComponent onSubmit={signIn}/>

}
