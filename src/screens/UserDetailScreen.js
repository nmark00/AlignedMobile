// screens/UserDetailScreen.js

import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../firebase/firebaseDB'
import Card from '../components/Card'
import ProfileCard from '../components/ProfileCard'

class UserDetailScreen extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      bio: '',
      gender: '',
      isLoading: true
    };
  }

  componentDidMount() {
    const dbRef = firebase.firestore().collection('users').doc(this.props.route.params.userkey)
    dbRef.get().then(res => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          name: user.name,
          bio: user.bio,
          gender: user.gender,
          isLoading: false
        });
      } else {
        console.log("Document does not exist!")
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state; 
    state[prop] = val;
    this.setState(state);
  }

  updateUser() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('users').doc(this.state.key);
    updateDBRef.set({
      name: this.state.name,
      bio: this.state.bio,
      gender: this.state.gender,
    }, {merge: true}).then(docRef => {
      this.setState({
        key: '',
        name: '',
        bio: '',
        gender: '',
        isLoading: ''
      });
      // this.props.navigation.navigate('UserScreen');
    }).catch(error => {
      console.error("Error: ", error);
      this.setState({isLoading: false});
    });
  }

  deleteUser() {
    const dbRef = firebase.firestore().collection('users').doc(this.props.route.params.userkey)
    dbRef.delete().then(res => {
      console.log('Item removed from database')
      this.props.navigation.navigate('UserScreen');
    })
  }

  openTwoButtonAlert = () => {
    Alert.alert(
      'Delete User',
      'Are you sure?',
      [
        { text: 'Yes', onPress: () => this.deleteUser() },
        { text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
      ],
      { cancelable: true }
    );
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
        <View>
          <ProfileCard userkey={this.props.route.params.userkey}/>
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={'Name'}
            value={this.state.name}
            onChangeText={val => this.inputValueUpdate(val, 'name')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder={'Bio'}
            value={this.state.bio}
            onChangeText={val => this.inputValueUpdate(val, 'bio')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Update"
            onPress={() => this.updateUser()}
            color="#19AC52"
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Delete"
            onPress={this.openTwoButtonAlert}
            color="#E37399"
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
  button: {
    marginBottom: 7, 
  }
})

export default UserDetailScreen;