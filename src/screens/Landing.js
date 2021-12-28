import React, { Component } from 'react';
import { StyleSheet, ScrollView, Button, View } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import firebase from '../firebase/firebaseDB'

class Landing extends Component {

	constructor() {
		super();

	}



	render() {
		return (
			<View style={styles.container}>
				 <Button
            title="Sign up"
            onPress={ ()=>{this.props.navigation.navigate('Signup');} }
            color="#E37399"
          />
          <Button
            title="Log in"
            onPress={ ()=>{this.props.navigation.navigate('Login');} }
            color="#E37399"
          />
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  }
})


export default Landing;