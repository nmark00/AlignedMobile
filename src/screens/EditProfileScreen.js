import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../firebase/firebaseDB'
import ProfileCard from '../components/ProfileCard'
import auth from '@react-native-firebase/auth';

class UserDetailScreen extends Component {

  constructor() {
    super();
    this.state = {
      gender: '',
      name: '',
      bio: '',
      sPref: '',
      pics: [],
      uid: ''
    };
  }

  componentDidMount() {

    this.setState({
      gender: this.props.route.params.gender,
      name: this.props.route.params.name,
      bio: this.props.route.params.bio,
      sPref: this.props.route.params.sPref,
      pics: this.props.route.params.pics,
      uid: this.props.route.params.userkey
    });
  }


  updateUser() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('users').doc(this.state.uid);
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
        isLoading: false
      });
      this.props.navigation.navigate('HomeScreen');
    }).catch(error => {
      console.error("Error: ", error);
      this.setState({isLoading: false});
    });
  }

  deleteUser() {
    auth().signOut();
    const dbRef = firebase.firestore().collection('users').doc(this.props.route.params.userkey)
    dbRef.delete().then(res => {
      console.log('Item removed from database')
      this.props.navigation.navigate('Landing', {screen: 'LandingComponent'});
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

        <View style={styles.inputGroup}>
          <TextInput
            placeholder={'Name'}
            value={this.state.name}
            onChangeText={val => this.setState({name: val})}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder={'Bio'}
            value={this.state.bio}
            onChangeText={val => this.setState({bio: val})}
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