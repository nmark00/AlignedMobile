import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, Animated, useWindowDimensions } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import ProfileCard from '../components/ProfileCard';
import auth from '@react-native-firebase/auth';
import firebase from '../firebase/firebaseDB';

const LIMIT = 8;

class UserScreen extends Component {

	constructor() {
		super();
		this.state = {
			// animation: new Animated.ValueXY({x:30, y:30}),
			animation: new Animated.Value(0),
			matches: [],
			likes: [],
			canScroll: false,
			packUsers: [],
		};
	}

	StartAnimation = () => {
		this.setState({opacity: 0, canScroll: true})
		Animated.timing(this.state.animation, {
			// toValue: {x: 250, y: 250},
			toValue: 100,
			duration: 1000,
			useNativeDriver: true
		}).start()
	}

	GetUsers = (forbiddenUsers) => {
		// console.log(forbiddenUsers)
		firebase.firestore().collection('users')
		.where(firebase.firestore.FieldPath.documentId(), 'not-in', forbiddenUsers)
		.limit(LIMIT)
		.get()
		.then(querySnapshot => {
			console.log(querySnapshot.docs.map(a => a.id))
			this.setState({packUsers: querySnapshot.docs.map(a => a.id)})
			return querySnapshot.docs.map(a => a.id);
		});
	}

	CreateUsers = async (packSize) => {
		const genders = ['male', 'female']
		for (var i = 0; i < packSize; i++) {
			const gender = genders[Math.floor(Math.random()*2)]
			const sPref = [... new Set([genders[Math.floor(Math.random()*2)],genders[Math.floor(Math.random()*2)]])]
			const picURL = await this.GetImgURL(gender);
			const user0 = await this.GetUserText(gender);
			const userObj = {
				...user0,
				pics: [picURL],
				gender: gender,
				likes: [],
				matches: [],
				sPref: sPref
			}
			console.log(userObj);
			await firebase.firestore().collection('users').doc().set(userObj)
		}
		
	}
	GetImgURL = (gender) => {
		return fetch("https://randomuser.me/api/?gender="+gender)
		.then(response => response.json())
		.then(obj => {
			return obj.results[0].picture.large
		});
	}
	GetUserText = (gender) => {
		return fetch("https://api.namefake.com/english/"+gender)
		.then(response => response.json())
		.then(obj => {
			return {
				name: obj.name,
				bday: obj.birth_data,
				bio: obj.address
			}
		});
	}

	componentDidMount() {
		// this.CreateUsers(10)
		const uid = auth().currentUser.uid;
		const ref = firebase.firestore().collection('users').doc(uid);
		ref.get().then(res => {
			if (res.exists) {
				const user = res.data();
				const packUsers = this.GetUsers(user.matches.concat(user.likes, [uid]))
				this.setState({
					matches: user.matches,
					likes: user.likes,
				});
			} else {
				console.log("Document does not exist!");
			}
		});
	}


	render() {
		const animStyles = []
		for (var i = 0; i < LIMIT; i++) {
			const xVal = this.state.animation.interpolate({
				inputRange: [0, 100],
				outputRange: [-320*i-320, -320 + i*20]
			});
			animStyles.push({
				transform: [{ translateX: xVal }]
			});
		}

		let packImg;

		if (this.state.canScroll)
			packImg = <View style={{width: 320, marginLeft: 30}}></View>
		else
			packImg = <TouchableOpacity onPress={this.StartAnimation} style={{zIndex: 999}}>
          	<Image style={styles.image1}
                source={require('../../public/images/aquarius-cardback.png')}/>
        </TouchableOpacity>

    return (
      <ScrollView style={[styles.container]} horizontal={true} scrollEnabled={this.state.canScroll}>
      	{packImg}
				{ this.state.packUsers.map((item, i) => {
						if (item) {
							return (
								<Animated.View key={i} style={[{ marginTop: 40, height: 470, width: 320 }, animStyles[i]]}>
					       	<ProfileCard userkey={item} />
					      </Animated.View>
							);
						}
					})
				}
      </ScrollView>
    );

  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    image1: {
	    marginLeft: 30,
	    marginTop: 10,
	    width: 320,
	    height: 600,
	    resizeMode: 'contain',
  	},
  	profileCard: {
  		marginTop: 70,
  		marginLeft: 30,
  		width: 300,
  		height: 470,
  	}
});


export default UserScreen;