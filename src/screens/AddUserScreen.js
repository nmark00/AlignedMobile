// screens/AddUserScreen.js

import React, { Component, useState } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import firebase from '../firebase/firebaseDB'
import { uploadImage } from '../firebase/crud'
import PhotoGallery from '../components/PhotoGallery'
import CameraGallery from '../components/CameraGallery'

class AddUserScreen extends Component {
	constructor() {
		super();
		this.dbRef = firebase.firestore().collection('users');
		this.state = {
			name: '',
			gender: '',
			astro: '',
			imageUrl: '',
			imageUpload: null, 
			isLoading: false
		};
	}
	
	getUrl = (image, imageData) => {
		const fileUri = decodeURI(image);
		this.setState({
			imageUrl: image,
			imageUpload: fileUri
		})
	}

	inputValueUpdate = (val, prop) => {
		const state = this.state;
		state[prop] = val;
		this.setState(state);
	}

	storeUser() {
		if (this.state.name === '') {
			alert('Fill at least your name!')
		} else {
			this.setState({isLoading: true,});
			this.dbRef.add({
				name: this.state.name,
				gender: this.state.gender,
				astro: this.state.astro,
				bio: this.state.bio
			}).then(res => {
				this.setState({
					name: '',
					gender: '',
					astro: '',
					bio: '',
					isLoading: false,
				});
				this.props.navigation.navigate('UserScreen')
			}).catch(err => {
				console.error("Error found: ", err);
				this.setState({isLoading: false,});
			});
		}
	}

	render() {
		if (this.state.isLoading) {
			return (
				<View style={styles.preloader}>
					<ActivityIndicator size="large" color="#9E9E9E"/>
				</View>
				)
		}
		return (
			<ScrollView style={styles.container}>
				<View style={styles.inputGroup}>
					<TextInput 
						placeholder={'Name'} 
						value={this.state.name} 
						onChangeText={val => this.inputValueUpdate(val, 'name')}/>
				</View>
				<View style={styles.inputGroup}>
					<TextInput
						multiline={true}
						numberOfLines={4}
						placeholder={'bio'}
						value={this.state.bio}
						onChangeText={val => this.inputValueUpdate(val, 'bio')}
					/>
				</View>
				<View style={styles.button}>
					<Button
						title='Add User'
						onPress={() => this.storeUser()}
						color="#19AC52"
					/>
				</View>
				<CameraGallery getImage={(url, base) => {this.getUrl(url, base)}} />
				<PhotoGallery getImage={(url, base) => {this.getUrl(url, base)}} />
				<Image style={styles.small} source={{uri:this.state.imageUpload}}/>
				<View style={styles.button}>
					<Button
						title='Upload Pic'
						onPress={() => uploadImage(this.state.imageUpload)}
						color="#19AC52"
					/>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  small: {
  	width: 70,
  	height: 70
  }
})

export default AddUserScreen;