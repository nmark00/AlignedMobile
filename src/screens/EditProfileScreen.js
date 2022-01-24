import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import firebase from '../firebase/firebaseDB'
import ProfileCard from '../components/ProfileCard'
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid'
import ChoosePic from '../components/ChoosePicAlt';

class UserDetailScreen extends Component {

  constructor() {
    super();
    this.state = {
      gender: '',
      name: '',
      bio: '',
      sPref: '',
      pics: [],
      uid: '',
      isLoading: true,
      updated2Pics: new Array(6)
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
    this.setState( { isLoading: false });
  }


  async updateUser() {
    this.setState({
      isLoading: true,
    });

    let updatedPics = this.state.pics;
    for (let [i, url] of this.state.updated2Pics.entries()) {
      

      if (url == null) {
        if (i >= updatedPics.length) {
          updatedPics.push('');
        }
        continue;
      }

      let ref = storage().ref(`users/${this.state.uid}/${i}`)

      if (url) {
        await ref.putFile(url);
        let updatedUrl = await ref.getDownloadURL();
        if (i >= updatedPics.length)
          updatedPics.push(updatedUrl)
        else
          updatedPics[i] = updatedUrl;
      } else {
        await ref.delete();
        updatedPics[i] = '';
      }
    }

    const updateDBRef = firebase.firestore().collection('users').doc(this.state.uid);
    updateDBRef.set({
      name: this.state.name,
      bio: this.state.bio,
      gender: this.state.gender,
      // pics: this.state.pics
      pics: updatedPics
    }, {merge: true}).then(docRef => {
      this.setState({
        key: '',
        name: '',
        bio: '',
        gender: '',
        isLoading: false,
        updated2Pics: new Array(6)
      });
      this.props.navigation.navigate('HomeScreen');
    }).catch(error => {
      console.error("Error: ", error);
      this.setState({isLoading: false});
    });
  }

  deleteUser() {
    auth().signOut();
    const uid = this.props.route.params.userkey;
    const ref = storage().ref(`users/${uid}`)
    ref.delete()
    .then(() => {
      const dbRef = firebase.firestore().collection('users').doc(this.props.route.params.userkey)
      dbRef.delete()
      .then(res => {
        console.log('Item removed from database')
        this.props.navigation.navigate('Landing', {screen: 'LandingComponent'});
      })
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

  updatePics(i, url) {
    let updated2Pics2 = this.state.updated2Pics;
    updated2Pics2[i] = url;
    this.setState({ updated2Pics: updated2Pics2 })
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

      {/* 1st ROW OF PICTURES */}
        <View style={styles.fieldRow}>
          <View style={{padding: 20}}>
            <ChoosePic 
              getImage={url => {this.updatePics(0, url); }}
              uri={this.state.pics[0]}
              />
          </View>
          <View style={{padding: 20}}>
            <ChoosePic 
              getImage={url => {this.updatePics(1, url); }}
              uri={this.state.pics[1]}
              />
          </View>
          <View style={{padding: 20}}>
            <ChoosePic 
              getImage={url => {this.updatePics(2, url); }}
              uri={this.state.pics[2]}
              />
          </View>
        </View>

      {/* 2nd ROW OF PICTURES */}
        <View style={styles.fieldRow}>
          <View style={{padding: 20}}>
            <ChoosePic 
              getImage={url => {this.updatePics(3, url); }}
              uri={this.state.pics[3]}
              />
          </View>
          <View style={{padding: 20}}>
            <ChoosePic 
              getImage={url => {this.updatePics(4, url); }}
              uri={this.state.pics[4]}
              />
          </View>
          <View style={{padding: 20}}>
            <ChoosePic 
              getImage={url => {this.updatePics(5, url); }}
              uri={this.state.pics[5]}
              />
          </View>
        </View>

        {/* EDIT TEXT FIELDS */}
        <View style={styles.inputGroup}>
          <Text style={styles.text}>Name: </Text>
          <TextInput
            placeholder={'Name'}
            value={this.state.name}
            onChangeText={val => this.setState({name: val})}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.text}>Bio: </Text>
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
            title="Delete Profile"
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
  },
  fieldRow: {
        flexDirection: 'row'
  },
  text: {
    fontSize: 18,
    paddingBottom: 5
  }
})

export default UserDetailScreen;