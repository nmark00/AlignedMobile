import React, { Component } from 'react';
import { StyleSheet, ScrollView, Button, View, StatusBar } from 'react-native';

class LandingScreen extends Component {

	constructor() {
		super();

	}



	render() {
		return (
			<View style={styles.container}>
      <StatusBar barStyle={'dark-content'}/>
          <Button
            title="Log in with phone number"
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
   paddingTop: 100
  }
})


export default LandingScreen;