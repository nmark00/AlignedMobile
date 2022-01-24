import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import firebase from '../firebase/firebaseDB'
import auth from '@react-native-firebase/auth';

class Chats extends Component {

	constructor() {
		super();
		this.firestoreRef = firebase.firestore().collection('users');
		this.state = {
			isLoading: true,
			userArr: [], //key and name of matches
			matches: [], //uid of matches
			chats: [], //uid of the chats
		};

	}

	componentDidMount() {
		const uid = auth().currentUser.uid;
    this.unsubscribe = this.firestoreRef.doc(uid)
    .onSnapshot(res => {
      const user = res.data();
      this.setState({matches: user.matches})

      this.firestoreRef
      .where(firebase.firestore.FieldPath.documentId(), 'in', user.matches)
      .onSnapshot(querySnapshot => {
      	const userArr = [];
      	const chats = [];
      	querySnapshot.forEach(res => {
      		chats.push([res.id, uid].sort().join(''))
      		userArr.push({ key: res.id, name: res.data().name })
      	});
      	this.setState({ userArr, isLoading: false, chats: chats })
      	console.log(chats)
      });
    });
	}

	componentWillUnmount() {
		this.unsubscribe();
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
				{
					this.state.userArr.map((item, i) => {
						return (
							<ListItem
								key={i}
								bottomDivider
								onPress={()=> {
									this.props.navigation.navigate('ChatScreen', {
										userkey: item.key
									});
								}}>
								<ListItem.Title>{item.name}</ListItem.Title>
								<ListItem.Subtitle>{item.bio}</ListItem.Subtitle>
							</ListItem>

							);
					})
				}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})


export default Chats;