import React, { Component } from 'react';

import CardFlip from 'react-native-card-flip';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import firebase from '../firebase/firebaseDB'
import styles from '../styles/ProfileCardStyles'

class ProfileCard extends Component {
  constructor() {
    super();
    this.state = {
      key: '',
      name: '',
      bio: '',
      gender: '',
      pics: [],
      isLoading: true,
      picIndex: 0,
      urls: []
    };
    // this.dbRef = firebase.firestore().collection('users').doc(props.userkey)
    this.leftPicTap = this.leftPicTap.bind(this)
    this.rightPicTap = this.rightPicTap.bind(this)
  }

  componentDidMount() {
    const dbRef = firebase.firestore().collection('users').doc(this.props.userkey)
    dbRef.get().then(res => {
      // if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          name: user.name,
          bio: user.bio,
          gender: user.gender,
          astro: user.astro,
          urls: user.pics.filter(n=>n)
        });
        return user.pics.filter(n=>n)
      // } else {
      //   console.log("Document does not exist!")
      // }
    }, () => console.log("Document does not exist!")).then(pics => {
      this.state.urls.forEach((u, i) => Image.prefetch(pics[i]))
    });
  }

  leftPicTap() {
    console.log("Left Press");
    const index = this.state.picIndex;
    const len = this.state.urls.length;
    const newPicIndex = (index + len - 1) % len;
    this.setState({picIndex: newPicIndex});
  }
  rightPicTap() {
    console.log("Right Press");
    const index = this.state.picIndex;
    const newPicIndex = (index + 1) % this.state.urls.length;
    this.setState({picIndex: newPicIndex});
  }

  render() {
    return (
      <View style={styles.container}>
        <CardFlip style={styles.cardContainer} ref={card => (this.card = card)}>
          <View style={styles.card}>
            <View style={styles.fieldRow}>
              {this.state.isLoading ? 
                (<ActivityIndicator size="large" style={styles.loadingWheel}/>) : null
              }
              <Image style={styles.image1} 
                source={{uri: this.state.urls[this.state.picIndex]}}
                onLoad={() => this.setState({isLoading: false})}/>
              <TouchableOpacity style={styles.cardL}
              onPress={this.leftPicTap}
              activeOpacity={1}/>
              <TouchableOpacity style={styles.cardR}
              onPress={this.rightPicTap}
              activeOpacity={1}/>
            </View>

            <TouchableOpacity
              // activeOpacity={1}
              // style={[styles.card, styles.card1]}
              style={styles.card1}
              onPress={() => this.card.flip()}>
              <Text style={styles.label}>{this.state.name}</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.card}>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.card, styles.card2]}
              onPress={() => this.card.flip()}>
              <Text style={styles.label}>{this.state.bio}</Text>
            </TouchableOpacity>
          </View>
        </CardFlip>
      </View>
    );
  }
}

export default ProfileCard;
